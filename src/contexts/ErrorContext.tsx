import { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { ErrorContextType, AppError, ErrorCategory, ErrorSeverity } from '@/types/global';
import { generateErrorId, shouldRetryError, getRetryDelay, logError } from '@/utils/errorHandler';

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

interface ErrorProviderProps {
  children: React.ReactNode;
}

export const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const [errors, setErrors] = useState<AppError[]>([]);
  const retryTimeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const addError = useCallback((error: Omit<AppError, 'id' | 'timestamp' | 'retryCount'>): string => {
    const newError: AppError = {
      ...error,
      id: String(generateErrorId()),
      timestamp: new Date(),
      retryCount: 0,
      maxRetries: error.maxRetries ?? 3, // Default to 3 retries
      retryable: error.retryable ?? true, // Default to retryable
    };

    setErrors(prev => [...prev, newError]);
    
    // Log the error
    logError(newError);

    // Auto-retry if the error is retryable
    if (newError.retryable) {
      scheduleRetry(newError);
    }

    return newError.id ?? '';

  }, []);

  const removeError = useCallback((id: string) => {
    // Clear any pending retry timeout
    const timeout = retryTimeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      retryTimeoutsRef.current.delete(id);
    }

    setErrors(prev => prev.filter(error => error.id !== id));
  }, []);

  const clearErrors = useCallback(() => {
    // Clear all pending retry timeouts
    retryTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    retryTimeoutsRef.current.clear();
    
    setErrors([]);
  }, []);

  const retryError = useCallback((id: string) => {
    setErrors(prev => prev.map(error => {
      if (error.id === id && shouldRetryError(error)) {
        const updatedError: AppError = {
          ...error,
          retryCount: (error.retryCount ?? 0) + 1,
        };

        // Schedule next retry
        scheduleRetry(updatedError);
        
        return updatedError;
      }
      return error;
    }));
  }, []);

  const scheduleRetry = useCallback((error: AppError) => {
    if (!shouldRetryError(error)) {
      return;
    }

    const delay = getRetryDelay(error);
    const timeout = setTimeout(() => {
      if (error.id) {
        retryTimeoutsRef.current.delete(error.id);
        retryError(error.id);
      }
    }, delay);

    if (error.id) {
      retryTimeoutsRef.current.set(error.id, timeout);
    }
  }, [retryError]);

  const getErrorsByCategory = useCallback((category: ErrorCategory): AppError[] => {
    return errors.filter(error => error.category === category);
  }, [errors]);

  const getErrorsBySeverity = useCallback((severity: ErrorSeverity): AppError[] => {
    return errors.filter(error => error.severity === severity);
  }, [errors]);

  // Cleanup timeouts on unmount
  const cleanup = useCallback(() => {
    retryTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    retryTimeoutsRef.current.clear();
  }, []);

  // Auto-cleanup on unmount
  const cleanupRef = useRef(cleanup);
  cleanupRef.current = cleanup;

  // Cleanup on unmount
  // const cleanupOnUnmount = useCallback(() => {
  //   return () => {
  //     cleanupRef.current();
  //   };
  // }, []);

  // // Set up cleanup effect
  // const cleanupEffect = cleanupOnUnmount();

  const contextValue: ErrorContextType = {
    errors,
    addError,
    removeError,
    clearErrors,
    retryError,
    getErrorsByCategory,
    getErrorsBySeverity,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
}; 