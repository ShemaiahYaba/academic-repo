import { useNotification } from '@/contexts/NotificationContext';
import { NotificationToast } from './NotificationToast';
import type { NotificationPosition } from '@/types/global';

const getPositionClasses = (position: NotificationPosition) => {
  switch (position) {
    case 'top-right':
      return 'top-0 right-0';
    case 'top-left':
      return 'top-0 left-0';
    case 'bottom-right':
      return 'bottom-0 right-0';
    case 'bottom-left':
      return 'bottom-0 left-0';
    case 'top-center':
      return 'top-0 left-1/2 transform -translate-x-1/2';
    case 'bottom-center':
      return 'bottom-0 left-1/2 transform -translate-x-1/2';
    default:
      return 'top-0 right-0';
  }
};

export const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  // Debug: Log notifications
  console.log('Current notifications:', notifications);

  // Group notifications by position
  const notificationsByPosition = notifications.reduce((acc, notification) => {
    const position = notification.position || 'top-left';
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(notification);
    return acc;
  }, {} as Record<NotificationPosition, typeof notifications>);

  return (
    <>
      {Object.entries(notificationsByPosition).map(([position, positionNotifications]) => (
        <div
          key={position}
          className={`fixed z-[9999] p-4 space-y-4 pointer-events-none ${getPositionClasses(position as NotificationPosition)}`}
        >
          {positionNotifications.map((notification) => (
            <NotificationToast
              key={notification.id}
              notification={notification}
              onRemove={removeNotification}
            />
          ))}
        </div>
      ))}
    </>
  );
}; 