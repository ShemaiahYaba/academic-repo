import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { DataContextType, DataCache, CacheEntry, RealtimeSubscription } from '@/types/global';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [cache, setCache] = useState<DataCache>({});
  const [subscriptions, setSubscriptions] = useState<RealtimeSubscription[]>([]);
  const subscriptionRefsRef = useRef<Map<string, any>>(new Map());

  // Cache management
  const getCachedData = useCallback(<T>(key: string): T | null => {
    const entry = cache[key];
    if (!entry) return null;

    // Check if data is expired
    const now = new Date();
    const isExpired = now.getTime() - entry.timestamp.getTime() > entry.ttl;
    
    if (isExpired) {
      // Remove expired entry
      setCache(prev => {
        const newCache = { ...prev };
        delete newCache[key];
        return newCache;
      });
      return null;
    }

    return entry.data as T;
  }, [cache]);

  const setCachedData = useCallback(<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void => {
    const entry: CacheEntry<T> = {
      data,
      timestamp: new Date(),
      ttl,
    };

    setCache(prev => ({
      ...prev,
      [key]: entry,
    }));
  }, []);

  const clearCache = useCallback((key?: string): void => {
    if (key) {
      setCache(prev => {
        const newCache = { ...prev };
        delete newCache[key];
        return newCache;
      });
    } else {
      setCache({});
    }
  }, []);

  // Real-time subscriptions
  const subscribe = useCallback((
    table: string,
    event: RealtimeSubscription['event'],
    callback: (payload: any) => void,
    filter?: string
  ): string => {
    const subscriptionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const subscription: RealtimeSubscription = {
      id: subscriptionId,
      table,
      event,
      filter,
      callback,
      isActive: true,
    };

    // Add to subscriptions list
    setSubscriptions(prev => [...prev, subscription]);

    // Create Supabase subscription
    let supabaseSubscription: any;

    if (filter) {
      supabaseSubscription = supabase
        .channel(subscriptionId)
        .on(
          'postgres_changes',
          {
            event,
            schema: 'public',
            table,
            filter,
          },
          callback
        )
        .subscribe();
    } else {
      supabaseSubscription = supabase
        .channel(subscriptionId)
        .on(
          'postgres_changes',
          {
            event,
            schema: 'public',
            table,
          },
          callback
        )
        .subscribe();
    }

    // Store subscription reference
    subscriptionRefsRef.current.set(subscriptionId, supabaseSubscription);

    return subscriptionId;
  }, []);

  const unsubscribe = useCallback((id: string): void => {
    // Remove from subscriptions list
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));

    // Unsubscribe from Supabase
    const subscription = subscriptionRefsRef.current.get(id);
    if (subscription) {
      supabase.removeChannel(subscription);
      subscriptionRefsRef.current.delete(id);
    }
  }, []);

  const unsubscribeAll = useCallback((): void => {
    // Clear all subscriptions
    setSubscriptions([]);

    // Unsubscribe from all Supabase channels
    subscriptionRefsRef.current.forEach(subscription => {
      supabase.removeChannel(subscription);
    });
    subscriptionRefsRef.current.clear();
  }, []);

  // Utility functions
  const isDataStale = useCallback((key: string, maxAge: number = 5 * 60 * 1000): boolean => {
    const entry = cache[key];
    if (!entry) return true;

    const now = new Date();
    return now.getTime() - entry.timestamp.getTime() > maxAge;
  }, [cache]);

  const getCacheStats = useCallback((): { size: number; keys: string[] } => {
    const keys = Object.keys(cache);
    return {
      size: keys.length,
      keys,
    };
  }, [cache]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      unsubscribeAll();
    };
  }, [unsubscribeAll]);

  const contextValue: DataContextType = {
    cache,
    subscriptions,
    getCachedData,
    setCachedData,
    clearCache,
    subscribe,
    unsubscribe,
    unsubscribeAll,
    isDataStale,
    getCacheStats,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}; 