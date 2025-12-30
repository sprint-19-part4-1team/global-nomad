import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/avatar';
import { User } from '@/shared/types/user.type';

interface LoggedInActionsProps {
  user: User;
}

export default function LoggedInActions({ user }: LoggedInActionsProps) {
  return (
    <div className='flex items-center'>
      {/* // TODO: 알림 팝업 추가 */}
      <div className='relative box-content w-24 pr-20 after:absolute after:top-1/2 after:right-0 after:block after:h-14 after:w-1 after:-translate-y-1/2 after:bg-gray-100'>
        알림
      </div>

      {/* // TODO: 마이페이지 드롭다운 추가 예정 */}
      <Link href='/mypage/info' className='ml-20 flex items-center'>
        <Avatar user={user}>
          <AvatarImage />
          <AvatarFallback />
        </Avatar>
        <span className='transition-color ml-10 body-14 font-medium text-gray-950 transition duration-500 hover:text-primary-600'>
          {user.nickname}
        </span>
      </Link>
    </div>
  );
}
