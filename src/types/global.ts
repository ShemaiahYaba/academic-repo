import type { User, Session } from '@supabase/supabase-js';
// import type { Database } from './supabase';
import { ReactNode } from 'react';

// Authentication Types
export type UserRole = 'admin' | 'user' | 'moderator';

export interface UserProfile {
  username: any;
  last_name: ReactNode;
  first_name: ReactNode;
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
}

// UI State Types
export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'es' | 'fr' | 'de';

export interface UIState {
  theme: Theme;
  language: Language;
  sidebarOpen: boolean;
  isLoading: boolean;
  loadingText: string | null;
}

// Error Types
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';
export type ErrorCategory = 
  | 'authentication'
  | 'network'
  | 'validation'
  | 'permission'
  | 'supabase'
  | 'domain'
  | 'unknown';

export interface AppError {
  id: string;
  message: string;
  title?: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  timestamp: Date;
  retryable: boolean;
  retryCount: number;
  maxRetries: number;
  context?: Record<string, any>;
  originalError?: Error;
}

// Notification Types
export type NotificationType = 'success' | 'error' | 'warning' | 'info';
export type NotificationPosition = 
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  position?: NotificationPosition;
  persistent?: boolean;
  actions?: NotificationAction[];
  timestamp: Date;
}

export interface NotificationAction {
  label: string;
  action: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

// Data State Types
export interface DataState<T = any> {
  data: T | null;
  isLoading: boolean;
  error: AppError | null;
  lastUpdated: Date | null;
  isStale: boolean;
}

export interface CacheEntry<T = any> {
  data: T;
  timestamp: Date;
  ttl: number; // Time to live in milliseconds
}

export interface DataCache {
  [key: string]: CacheEntry;
}

// Real-time Subscription Types
export interface RealtimeSubscription {
  id: string;
  table: string;
  event: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  filter?: string;
  callback: (payload: any) => void;
  isActive: boolean;
}

// Global State Types
export interface GlobalState {
  auth: AuthState;
  ui: UIState;
  errors: AppError[];
  notifications: Notification[];
  cache: DataCache;
  subscriptions: RealtimeSubscription[];
}

// Context Types
export interface AuthContextType {
  // State
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  
  // Actions
  signUp: (email: string, password: string, profile?: Partial<UserProfile>) => Promise<{ user: User; error: AppError | null }>;
  signIn: (email: string, password: string) => Promise<{ user: User; error: AppError | null }>;
  signOut: () => Promise<{ error: AppError | null }>;
  resetPassword: (email: string) => Promise<{ error: AppError | null }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ profile: UserProfile; error: AppError | null }>;
  refreshSession: () => Promise<void>;
  
  // Utilities
  hasRole: (role: UserRole) => boolean;
  hasPermission: (permission: string) => boolean;
}

export interface UIContextType {
  // State
  theme: Theme;
  language: Language;
  sidebarOpen: boolean;
  isLoading: boolean;
  loadingText: string | null;
  
  // Actions
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  toggleSidebar: () => void;
  setLoading: (loading: boolean, text?: string) => void;
}

export interface ErrorContextType {
  // State
  errors: AppError[];
  
  // Actions
  addError: (error: Omit<AppError, 'id' | 'timestamp' | 'retryCount'>) => string;
  removeError: (id: string) => void;
  clearErrors: () => void;
  retryError: (id: string) => void;
  
  // Utilities
  getErrorsByCategory: (category: ErrorCategory) => AppError[];
  getErrorsBySeverity: (severity: ErrorSeverity) => AppError[];
}

export interface NotificationContextType {
  // State
  notifications: Notification[];
  
  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Convenience methods
  success: (title: string, message: string, options?: Partial<Notification>) => string;
  error: (title: string, message: string, options?: Partial<Notification>) => string;
  warning: (title: string, message: string, options?: Partial<Notification>) => string;
  info: (title: string, message: string, options?: Partial<Notification>) => string;
}

export interface DataContextType {
  // State
  cache: DataCache;
  subscriptions: RealtimeSubscription[];
  
  // Actions
  getCachedData: <T>(key: string) => T | null;
  setCachedData: <T>(key: string, data: T, ttl?: number) => void;
  clearCache: (key?: string) => void;
  
  // Real-time subscriptions
  subscribe: (table: string, event: RealtimeSubscription['event'], callback: (payload: any) => void, filter?: string) => string;
  unsubscribe: (id: string) => void;
  unsubscribeAll: () => void;
  
  // Utilities
  isDataStale: (key: string, maxAge?: number) => boolean;
  getCacheStats: () => { size: number; keys: string[] };
} 