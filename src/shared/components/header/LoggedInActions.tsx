'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import NotificationButton from '@/features/notification/components/NotificationButton';
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
      <NotificationButton />

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
