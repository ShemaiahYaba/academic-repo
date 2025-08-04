import { useEffect, useState } from 'react';
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import type { Notification, NotificationType } from '@/types/global';

interface NotificationToastProps {
  notification: Notification;
  onRemove: (id: string) => void;
}

const getIcon = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return <CheckCircleIcon className="h-5 w-5 text-green-400" />;
    case 'error':
      return <ExclamationCircleIcon className="h-5 w-5 text-red-400" />;
    case 'warning':
      return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />;
    case 'info':
      return <InformationCircleIcon className="h-5 w-5 text-blue-400" />;
    default:
      return <InformationCircleIcon className="h-5 w-5 text-gray-400" />;
  }
};

const getStyles = (type: NotificationType) => {
  const baseStyles = "flex w-full max-w-sm bg-white dark:bg-gray-800 shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden";
  
  switch (type) {
    case 'success':
      return `${baseStyles} ring-green-500/20`;
    case 'error':
      return `${baseStyles} ring-red-500/20`;
    case 'warning':
      return `${baseStyles} ring-yellow-500/20`;
    case 'info':
      return `${baseStyles} ring-blue-500/20`;
    default:
      return baseStyles;
  }
};

const getProgressColor = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return 'bg-green-500';
    case 'error':
      return 'bg-red-500';
    case 'warning':
      return 'bg-yellow-500';
    case 'info':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

export const NotificationToast = ({ notification, onRemove }: NotificationToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  // Determine animation direction based on position
  const getAnimationClasses = () => {
    const position = notification.position || 'top-left';
    if (position.includes('left')) {
      return isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0';
    } else if (position.includes('right')) {
      return isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0';
    } else {
      // For center positions, use fade animation
      return isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0';
    }
  };

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!notification.duration || notification.persistent) return;

    const startTime = Date.now();
    const duration = notification.duration;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining > 0) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [notification.duration, notification.persistent]);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(notification.id), 300);
  };

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out pointer-events-auto ${getAnimationClasses()}`}
    >
      <div className={getStyles(notification.type)}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {getIcon(notification.type)}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {notification.title}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {notification.message}
              </p>
              {notification.actions && notification.actions.length > 0 && (
                <div className="mt-3 flex space-x-2">
                  {notification.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className={`text-xs px-2 py-1 rounded ${
                        action.variant === 'primary'
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : action.variant === 'danger'
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                onClick={handleRemove}
                className="inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:text-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        {notification.duration && !notification.persistent && (
          <div className="h-1 bg-gray-200 dark:bg-gray-700">
            <div
              className={`h-full transition-all duration-100 ease-linear ${getProgressColor(notification.type)}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}; 