'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Icons from '@/assets/icons';
import NotificationModal from '@/features/notification/components/NotificationModal';
import { useDeleteNotificationMutation } from '@/features/notification/mutations/useDeleteNotificationMutation';
import { useNotificationsQuery } from '@/features/notification/queries/useNotificationsQuery';
import { logout } from '@/shared/apis/feature/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/avatar';
import {
  ActionDropdown,
  ActionDropdownContent,
  ActionDropdownItem,
  ActionDropdownTrigger,
} from '@/shared/components/dropdown/action';
import { useUserStore } from '@/shared/stores/userStore';
import { UserServiceResponseDto } from '@/shared/types/user';

interface LoggedInActionsProps {
  user: UserServiceResponseDto;
}

export default function LoggedInActions({ user }: LoggedInActionsProps) {
  const router = useRouter();
  const clearSession = useUserStore((state) => state.clearSession);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useNotificationsQuery();
  const { mutate: deleteNotification } = useDeleteNotificationMutation();

  const notifications = data?.notifications ?? [];
  const hasNotifications = notifications.length > 0;

  const handleDeleteOne = (id: number) => {
    deleteNotification(id);
  };

  const handleDeleteAll = async () => {
    setIsModalOpen(false);
    notifications.forEach((notification) => {
      deleteNotification(notification.id);
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      clearSession('user');
      router.replace('/');
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('로그아웃에 실패했습니다.');
    }
  };

  return (
    <div className='flex items-center'>
      <div className='relative box-content w-24 pr-20 after:absolute after:top-1/2 after:right-0 after:block after:h-14 after:w-1 after:-translate-y-1/2 after:bg-gray-100'>
        <button
          type='button'
          aria-label='알림'
          disabled={!hasNotifications}
          onClick={() => setIsModalOpen((prev) => !prev)}>
          {hasNotifications ? (
            <Icons.Alert
              className={`h-24 w-24 cursor-pointer text-gray-600 ${isModalOpen ? 'text-primary-500' : ''}`}
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

      <div className='ml-20'>
        <ActionDropdown>
          <ActionDropdownTrigger aria-label='유저 메뉴 열기' className='flex items-center'>
            <Avatar user={user}>
              <AvatarImage />
              <AvatarFallback />
            </Avatar>
            <span className='ml-10 body-14 font-medium text-gray-950'>{user.nickname}</span>
          </ActionDropdownTrigger>
          <ActionDropdownContent className='right-0 left-auto w-full min-w-96'>
            <ActionDropdownItem onClick={handleLogout} className='min-w-full'>
              로그아웃
            </ActionDropdownItem>
            <ActionDropdownItem onClick={() => router.push('/mypage/info')} className='min-w-full'>
              마이페이지
            </ActionDropdownItem>
          </ActionDropdownContent>
        </ActionDropdown>
      </div>
    </div>
  );
}
