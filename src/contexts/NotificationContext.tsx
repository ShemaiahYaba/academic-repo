import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import type { NotificationContextType, Notification } from '@/types/global';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const dismissTimeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const generateNotificationId = useCallback((): string => {
    return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>): string => {
    const newNotification: Notification = {
      ...notification,
      id: generateNotificationId(),
      timestamp: new Date(),
      position: notification.position || 'top-right',
      duration: notification.duration ?? 5000, // Default 5 seconds
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-dismiss if not persistent and has duration
    if (!newNotification.persistent && newNotification.duration && newNotification.duration > 0) {
      const timeout = setTimeout(() => {
        removeNotification(newNotification.id);
      }, newNotification.duration);

      dismissTimeoutsRef.current.set(newNotification.id, timeout);
    }

    return newNotification.id;
  }, [generateNotificationId]);

  const removeNotification = useCallback((id: string) => {
    // Clear dismiss timeout
    const timeout = dismissTimeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      dismissTimeoutsRef.current.delete(id);
    }

    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    // Clear all dismiss timeouts
    dismissTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    dismissTimeoutsRef.current.clear();
    
    setNotifications([]);
  }, []);

  // Convenience methods for different notification types
  const success = useCallback((title: string, message: string, options?: Partial<Notification>): string => {
    return addNotification({
      type: 'success',
      title,
      message,
      ...options,
    });
  }, [addNotification]);

  const error = useCallback((title: string, message: string, options?: Partial<Notification>): string => {
    return addNotification({
      type: 'error',
      title,
      message,
      duration: options?.duration ?? 8000, // Longer duration for errors
      ...options,
    });
  }, [addNotification]);

  const warning = useCallback((title: string, message: string, options?: Partial<Notification>): string => {
    return addNotification({
      type: 'warning',
      title,
      message,
      duration: options?.duration ?? 6000, // Medium duration for warnings
      ...options,
    });
  }, [addNotification]);

  const info = useCallback((title: string, message: string, options?: Partial<Notification>): string => {
    return addNotification({
      type: 'info',
      title,
      message,
      ...options,
    });
  }, [addNotification]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      dismissTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      dismissTimeoutsRef.current.clear();
    };
  }, []);

  const contextValue: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    success,
    error,
    warning,
    info,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
}; 