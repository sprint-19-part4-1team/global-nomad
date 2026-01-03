'use client';

import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/avatar';
import {
  ActionDropdown,
  ActionDropdownContent,
  ActionDropdownItem,
  ActionDropdownTrigger,
} from '@/shared/components/dropdown/action';
import { UserServiceResponseDto } from '@/shared/types/user';

interface LoggedInActionsProps {
  user: UserServiceResponseDto;
}

export default function LoggedInActions({ user }: LoggedInActionsProps) {
  const router = useRouter();

  return (
    <div className='flex items-center'>
      {/* // TODO: 알림 팝업 추가 */}
      <div className='relative box-content w-24 pr-20 after:absolute after:top-1/2 after:right-0 after:block after:h-14 after:w-1 after:-translate-y-1/2 after:bg-gray-100'>
        알림
      </div>

      <div className='ml-20 flex items-center'>
        <ActionDropdown>
          <ActionDropdownTrigger aria-label='유저 메뉴 열기'>
            <Avatar user={user}>
              <AvatarImage />
              <AvatarFallback />
            </Avatar>
          </ActionDropdownTrigger>
          <ActionDropdownContent>
            <ActionDropdownItem onClick={() => false} />
            <ActionDropdownItem onClick={() => router.push('/mypage/info')}>
              마이페이지
            </ActionDropdownItem>
          </ActionDropdownContent>
        </ActionDropdown>

        <span className='ml-10 body-14 font-medium text-gray-950'>{user.nickname}</span>
      </div>
    </div>
  );
}
