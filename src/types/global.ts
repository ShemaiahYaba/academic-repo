import type { User, Session } from "@supabase/supabase-js";

// -------------------- //
//      AUTH TYPES      //
// -------------------- //

export type UserRole = "admin" | "user" | "editor";

export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string | null;
  avatar_url?: string | null;
  role?: UserRole;
  created_at?: string;
  updated_at?: string;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
}

// -------------------- //
//       UI TYPES       //
// -------------------- //

export type Theme = "light" | "dark" | "system";
export type Language = "en" | "es" | "fr" | "de";

export interface UIState {
  theme: Theme;
  language: Language;
  sidebarOpen: boolean;
  isLoading: boolean;
  loadingText: string | null;
}

// -------------------- //
//      ERROR TYPES     //
// -------------------- //

export type ErrorSeverity = "low" | "medium" | "high" | "critical";
export type ErrorCategory =
  | "authentication"
  | "network"
  | "validation"
  | "permission"
  | "supabase"
  | "domain"
  | "unknown";

export interface AppError {
  id?: string;
  message: string;
  title?: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  timestamp?: Date;
  retryable?: boolean;
  retryCount?: number;
  maxRetries?: number;
  context?: Record<string, any>;
  originalError?: Error;
}

// -------------------- //
//   NOTIFICATION TYPES //
// -------------------- //

export type NotificationType = "success" | "error" | "warning" | "info";
export type NotificationPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export interface NotificationAction {
  label: string;
  action: () => void;
  variant?: "primary" | "secondary" | "danger";
}

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

// -------------------- //
//     DATA CACHE       //
// -------------------- //

export interface CacheEntry<T = any> {
  data: T;
  timestamp: Date;
  ttl: number; // Time to live in milliseconds
}

export interface DataCache {
  [key: string]: CacheEntry;
}

export interface DataState<T = any> {
  data: T | null;
  isLoading: boolean;
  error: AppError | null;
  lastUpdated: Date | null;
  isStale: boolean;
}

// -------------------- //
//  REAL-TIME SUBS      //
// -------------------- //

export interface RealtimeSubscription {
  id: string;
  table: string;
  event: "INSERT" | "UPDATE" | "DELETE" | "*";
  filter?: string;
  callback: (payload: any) => void;
  isActive: boolean;
}

// -------------------- //
//    GLOBAL STATE      //
// -------------------- //

export interface GlobalState {
  auth: AuthState;
  ui: UIState;
  errors: AppError[];
  notifications: Notification[];
  cache: DataCache;
  subscriptions: RealtimeSubscription[];
}

// -------------------- //
//    CONTEXT TYPES     //
// -------------------- //

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;

  signIn: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; error: AppError | null }>;

  signUp: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; error: AppError | null }>;

  signOut: () => Promise<void>;

  resetPassword?: (email: string) => Promise<{ error: AppError | null }>;

  updateProfile?: (
    updates: Partial<UserProfile>
  ) => Promise<{ profile: UserProfile | null; error: AppError | null }>;

  refreshSession?: () => Promise<void>;
  hasRole?: (role: UserRole) => boolean;
  hasPermission?: (permission: string) => boolean;
}

export interface UIContextType {
  theme: Theme;
  language: Language;
  sidebarOpen: boolean;
  isLoading: boolean;
  loadingText: string | null;

  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  toggleSidebar: () => void;
  setLoading: (loading: boolean, text?: string) => void;
}

export interface ErrorContextType {
  errors: AppError[];
  addError: (
    error: Omit<AppError, "id" | "timestamp" | "retryCount">
  ) => string;
  removeError: (id: string) => void;
  clearErrors: () => void;
  retryError: (id: string) => void;
  getErrorsByCategory: (category: ErrorCategory) => AppError[];
  getErrorsBySeverity: (severity: ErrorSeverity) => AppError[];
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp">
  ) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  success: (
    title: string,
    message: string,
    options?: Partial<Notification>
  ) => string;
  error: (
    title: string,
    message: string,
    options?: Partial<Notification>
  ) => string;
  warning: (
    title: string,
    message: string,
    options?: Partial<Notification>
  ) => string;
  info: (
    title: string,
    message: string,
    options?: Partial<Notification>
  ) => string;
}

export interface DataContextType {
  cache: DataCache;
  subscriptions: RealtimeSubscription[];

  getCachedData: <T>(key: string) => T | null;
  setCachedData: <T>(key: string, data: T, ttl?: number) => void;
  clearCache: (key?: string) => void;

  subscribe: (
    table: string,
    event: RealtimeSubscription["event"],
    callback: (payload: any) => void,
    filter?: string
  ) => string;
  unsubscribe: (id: string) => void;
  unsubscribeAll: () => void;

  isDataStale: (key: string, maxAge?: number) => boolean;
  getCacheStats: () => { size: number; keys: string[] };
}
