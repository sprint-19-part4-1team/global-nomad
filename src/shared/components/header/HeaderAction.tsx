'use client';

import dynamic from 'next/dynamic';
import GuestActions from '@/shared/components/header/GuestAction';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import { useUserStore } from '@/shared/stores/userStore';
import LoggedInActions from './LoggedInActions';

function HeaderActionsContent() {
  const user = useUserStore((state) => state.user);
  return user ? <LoggedInActions user={user} /> : <GuestActions />;
}

// dynamic import로 SSR 비활성화
const DynamicHeaderActionsContent = dynamic(() => Promise.resolve(HeaderActionsContent), {
  ssr: false,
  loading: () => (
    <div className='flex items-center gap-16'>
      <Skeleton className='h-32 w-150 rounded' />
    </div>
  ),
});

export default function HeaderActions() {
  return <DynamicHeaderActionsContent />;
}
