import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useError } from '@/contexts/ErrorContext';
import { useNotification } from '@/contexts/NotificationContext';
import { useData } from '@/contexts/DataContext';
import { parseSupabaseError } from '@/utils/errorHandler';
import type { PostgrestError, AuthError } from '@supabase/supabase-js';
import type { AppError } from '@/types/global';

interface UseSupabaseOptions {
  showNotifications?: boolean;
  cacheKey?: string;
  cacheTTL?: number;
}

export const useSupabase = (options: UseSupabaseOptions = {}) => {
  const { showNotifications = true, cacheKey, cacheTTL = 5 * 60 * 1000 } = options;
  const { addError } = useError();
  const { success, error: showError } = useNotification();
  const { getCachedData, setCachedData } = useData();

  const handleError = useCallback((error: PostgrestError | AuthError | Error, context?: string) => {
    const appError = parseSupabaseError(error);
    if (context) {
      appError.context = { ...appError.context, operation: context };
    }
    
    addError(appError);
    
    if (showNotifications) {
      showError(appError.title || 'Error', appError.message);
    }
    
    return appError;
  }, [addError, showNotifications, showError]);

  const query = useCallback(async <T>(
    queryFn: () => Promise<{ data: T | null; error: PostgrestError | null }>,
    context?: string
  ): Promise<{ data: T | null; error: AppError | null }> => {
    try {
      // Check cache first if cacheKey is provided
      if (cacheKey) {
        const cachedData = getCachedData<T>(cacheKey);
        if (cachedData) {
          return { data: cachedData, error: null };
        }
      }

      const { data, error } = await queryFn();
      
      if (error) {
        const appError = handleError(error, context);
        return { data: null, error: appError };
      }

      // Cache the result if cacheKey is provided
      if (cacheKey && data) {
        setCachedData(cacheKey, data, cacheTTL);
      }

      return { data, error: null };
    } catch (err) {
      const appError = handleError(err as Error, context);
      return { data: null, error: appError };
    }
  }, [cacheKey, cacheTTL, getCachedData, setCachedData, handleError]);

  const mutate = useCallback(async <T>(
    mutationFn: () => Promise<{ data: T | null; error: PostgrestError | null }>,
    context?: string,
    successMessage?: string
  ): Promise<{ data: T | null; error: AppError | null }> => {
    try {
      const { data, error } = await mutationFn();
      
      if (error) {
        const appError = handleError(error, context);
        return { data: null, error: appError };
      }

      if (showNotifications && successMessage) {
        success('Success', successMessage);
      }

      return { data, error: null };
    } catch (err) {
      const appError = handleError(err as Error, context);
      return { data: null, error: appError };
    }
  }, [handleError, showNotifications, success]);

  const auth = useCallback(async <T>(
    authFn: () => Promise<{ data: T | null; error: AuthError | null }>,
    context?: string
  ): Promise<{ data: T | null; error: AppError | null }> => {
    try {
      const { data, error } = await authFn();
      
      if (error) {
        const appError = handleError(error, context);
        return { data: null, error: appError };
      }

      return { data, error: null };
    } catch (err) {
      const appError = handleError(err as Error, context);
      return { data: null, error: appError };
    }
  }, [handleError]);

  return {
    query,
    mutate,
    auth,
    supabase,
  };
}; 