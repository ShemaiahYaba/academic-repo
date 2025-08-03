import type { PostgrestError, AuthError } from '@supabase/supabase-js';
import type { AppError, ErrorCategory, ErrorSeverity } from '@/types/global';

// Error parsing utilities
export function parseSupabaseError(error: PostgrestError | AuthError | Error): AppError {
  const baseError: Omit<AppError, 'id' | 'timestamp' | 'retryCount'> = {
    message: error.message,
    severity: 'medium',
    category: 'unknown',
    retryable: false,
    maxRetries: 3,
    originalError: error,
  };

  // Handle Supabase Auth errors
  if ('status' in error && 'name' in error && error.name === 'AuthApiError') {
    const authError = error as AuthError;
    const status = authError.status || 500; // Default to 500 if status is undefined
    return {
      ...baseError,
      id: generateErrorId(),
      timestamp: new Date(),
      retryCount: 0,
      category: 'authentication',
      severity: getAuthErrorSeverity(status),
      retryable: isAuthErrorRetryable(status),
      title: getAuthErrorTitle(status),
      message: getAuthErrorMessage(status, authError.message),
    };
  }

  // Handle Supabase Postgrest errors
  if ('code' in error && 'details' in error && 'hint' in error) {
    const postgrestError = error as PostgrestError;
    return {
      ...baseError,
      id: generateErrorId(),
      timestamp: new Date(),
      retryCount: 0,
      category: 'supabase',
      severity: getPostgrestErrorSeverity(postgrestError.code),
      retryable: isPostgrestErrorRetryable(postgrestError.code),
      title: 'Database Error',
      message: getPostgrestErrorMessage(postgrestError),
      context: {
        code: postgrestError.code,
        details: postgrestError.details,
        hint: postgrestError.hint,
      },
    };
  }

  // Handle network errors
  if (error.name === 'NetworkError' || error.message.includes('network')) {
    return {
      ...baseError,
      id: generateErrorId(),
      timestamp: new Date(),
      retryCount: 0,
      category: 'network',
      severity: 'high',
      retryable: true,
      maxRetries: 5,
      title: 'Network Error',
      message: 'Unable to connect to the server. Please check your internet connection.',
    };
  }

  // Handle validation errors
  if (error.name === 'ValidationError' || error.message.includes('validation')) {
    return {
      ...baseError,
      id: generateErrorId(),
      timestamp: new Date(),
      retryCount: 0,
      category: 'validation',
      severity: 'low',
      retryable: false,
      title: 'Validation Error',
    };
  }

  // Handle permission errors
  if (error.message.includes('permission') || error.message.includes('unauthorized')) {
    return {
      ...baseError,
      id: generateErrorId(),
      timestamp: new Date(),
      retryCount: 0,
      category: 'permission',
      severity: 'medium',
      retryable: false,
      title: 'Permission Denied',
      message: 'You do not have permission to perform this action.',
    };
  }

  // Default error
  return {
    ...baseError,
    id: generateErrorId(),
    timestamp: new Date(),
    retryCount: 0,
    title: 'Unexpected Error',
    message: 'An unexpected error occurred. Please try again.',
  };
}

// Auth error utilities
function getAuthErrorSeverity(status: number): ErrorSeverity {
  switch (status) {
    case 400:
      return 'low';
    case 401:
      return 'medium';
    case 403:
      return 'medium';
    case 429:
      return 'high';
    case 500:
      return 'critical';
    default:
      return 'medium';
  }
}

function isAuthErrorRetryable(status: number): boolean {
  return status >= 500 || status === 429;
}

function getAuthErrorTitle(status: number): string {
  switch (status) {
    case 400:
      return 'Invalid Request';
    case 401:
      return 'Authentication Failed';
    case 403:
      return 'Access Denied';
    case 429:
      return 'Too Many Requests';
    case 500:
      return 'Server Error';
    default:
      return 'Authentication Error';
  }
}

function getAuthErrorMessage(status: number, originalMessage: string): string {
  switch (status) {
    case 400:
      return 'Please check your input and try again.';
    case 401:
      return 'Invalid email or password. Please try again.';
    case 403:
      return 'Your account has been suspended or you lack the required permissions.';
    case 429:
      return 'Too many login attempts. Please wait a moment before trying again.';
    case 500:
      return 'Server error. Please try again later.';
    default:
      return originalMessage || 'An authentication error occurred.';
  }
}

// Postgrest error utilities
function getPostgrestErrorSeverity(code: string): ErrorSeverity {
  if (code.startsWith('42')) return 'low'; // Syntax errors
  if (code.startsWith('22')) return 'low'; // Data errors
  if (code.startsWith('23')) return 'medium'; // Integrity constraint violations
  if (code.startsWith('25')) return 'high'; // Invalid transaction state
  if (code.startsWith('28')) return 'medium'; // Invalid authorization specification
  if (code.startsWith('3D')) return 'low'; // Invalid catalog name
  if (code.startsWith('3F')) return 'low'; // Invalid schema name
  if (code.startsWith('40')) return 'critical'; // Transaction rollback
  if (code.startsWith('53')) return 'critical'; // Insufficient resources
  if (code.startsWith('54')) return 'critical'; // Program limit exceeded
  if (code.startsWith('55')) return 'critical'; // Object not in prerequisite state
  if (code.startsWith('57')) return 'critical'; // Operator intervention
  if (code.startsWith('58')) return 'critical'; // System error
  if (code.startsWith('F0')) return 'critical'; // Configuration file error
  if (code.startsWith('HV')) return 'critical'; // Foreign data wrapper error
  if (code.startsWith('P0')) return 'critical'; // PL/pgSQL error
  if (code.startsWith('XX')) return 'critical'; // Internal error
  return 'medium';
}

function isPostgrestErrorRetryable(code: string): boolean {
  // Retryable errors are typically temporary issues
  return code.startsWith('40') || code.startsWith('53') || code.startsWith('57') || code.startsWith('58');
}

function getPostgrestErrorMessage(error: PostgrestError): string {
  // Provide user-friendly messages based on error codes
  if (error.code === '23505') {
    return 'This record already exists. Please use a different value.';
  }
  if (error.code === '23503') {
    return 'This operation would violate data integrity. Please check your input.';
  }
  if (error.code === '23514') {
    return 'The data does not meet the required constraints.';
  }
  if (error.code === '42P01') {
    return 'The requested resource was not found.';
  }
  if (error.code === '42501') {
    return 'You do not have permission to perform this operation.';
  }
  if (error.code === '42703') {
    return 'The requested field does not exist.';
  }
  
  return error.message || 'A database error occurred.';
}

// Utility functions
export function generateErrorId(): string {
  return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function shouldRetryError(error: AppError): boolean {
  return error.retryable && error.retryCount < error.maxRetries;
}

export function getRetryDelay(error: AppError): number {
  // Exponential backoff: 1s, 2s, 4s, 8s, etc.
  return Math.min(1000 * Math.pow(2, error.retryCount), 30000);
}

export function categorizeError(error: Error): ErrorCategory {
  if (error.name === 'AuthApiError') return 'authentication';
  if (error.name === 'PostgrestError') return 'supabase';
  if (error.message.includes('network') || error.message.includes('fetch')) return 'network';
  if (error.message.includes('validation')) return 'validation';
  if (error.message.includes('permission') || error.message.includes('unauthorized')) return 'permission';
  return 'unknown';
}

// Error logging
export function logError(error: AppError): void {
  console.error('Application Error:', {
    id: error.id,
    title: error.title,
    message: error.message,
    severity: error.severity,
    category: error.category,
    timestamp: error.timestamp,
    context: error.context,
    originalError: error.originalError,
  });

  // In production, you might want to send this to an error tracking service
  // like Sentry, LogRocket, or your own error tracking system
  if (import.meta.env.PROD) {
    // Example: sendToErrorTrackingService(error);
  }
}

// Error recovery suggestions
export function getErrorRecoverySuggestion(error: AppError): string | null {
  switch (error.category) {
    case 'authentication':
      return 'Please try logging in again or contact support if the problem persists.';
    case 'network':
      return 'Please check your internet connection and try again.';
    case 'validation':
      return 'Please review your input and ensure all required fields are completed correctly.';
    case 'permission':
      return 'Please contact your administrator if you believe you should have access to this resource.';
    case 'supabase':
      return 'Please try again in a moment. If the problem persists, contact support.';
    default:
      return 'Please try again. If the problem persists, contact support.';
  }
} 