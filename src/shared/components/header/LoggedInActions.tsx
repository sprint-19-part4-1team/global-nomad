import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/avatar';
import { User } from '@/shared/types/user';

interface LoggedInActionsProps {
  user: User;
  nickname?: string;
}

export default function LoggedInActions({ user, nickname }: LoggedInActionsProps) {
  return (
    <div className='flex items-center'>
      {/* 알림 */}
      <div className='relative box-content w-24 pr-20 after:absolute after:top-1/2 after:right-0 after:block after:h-14 after:w-1 after:-translate-y-1/2 after:bg-gray-100'>
        알림
      </div>

      {/* 마이페이지 */}
      <Link href='/mypage/info' className='ml-20 flex items-center'>
        <Avatar user={user}>
          <AvatarImage />
          <AvatarFallback />
        </Avatar>
        <span className='transition-color ml-10 body-14 font-medium text-gray-950 transition duration-500 hover:text-primary-600'>
          {nickname}
        </span>
      </Link>
    </div>
  );
}
