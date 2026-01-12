'use client';

import { useRef, useState } from 'react';
import Icons from '@/assets/icons';
import { useDeleteNotificationMutation } from '@/features/notification/mutations/useDeleteNotificationMutation';
import { useNotificationsQuery } from '@/features/notification/queries/useNotificationsQuery';
import useOutsideClick from '@/shared/hooks/useOutsideClick';
import { cn } from '@/shared/utils/cn';
import NotificationModal from './NotificationModal';

export default function NotificationButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useOutsideClick(notificationRef, () => setIsModalOpen(false), isModalOpen);

  const { data } = useNotificationsQuery();
  const { mutate: deleteNotification, mutateAsync: deleteNotificationAsync } =
    useDeleteNotificationMutation();

  const notifications = data?.notifications ?? [];
  const hasNotifications = notifications.length > 0;

  const handleDeleteOne = (id: number) => {
    deleteNotification(id);
  };

  const handleDeleteAll = async () => {
    setIsModalOpen(false);
    try {
      await Promise.all(
        notifications.map((notification) => deleteNotificationAsync(notification.id))
      );
    } catch {}
  };

  return (
    <div
      ref={notificationRef}
      className='relative box-content w-24 pr-20 after:absolute after:top-1/2 after:right-0 after:block after:h-14 after:w-1 after:-translate-y-1/2 after:bg-gray-100'>
      <button
        type='button'
        aria-label='알림'
        disabled={!hasNotifications}
        onClick={() => setIsModalOpen((prev) => !prev)}>
        {hasNotifications ? (
          <Icons.Alert
            className={cn(
              'h-24 w-24 cursor-pointer text-gray-600',
              isModalOpen ? 'text-primary-500' : ''
            )}
          />
        ) : (
          <Icons.AlertOff className='h-24 w-24 text-gray-600' />
        )}
      </button>
      {isModalOpen && (
        <NotificationModal
          notifications={notifications}
          onDeleteAll={handleDeleteAll}
          onDeleteOne={handleDeleteOne}
        />
      )}
    </div>
  );
}
