'use client';

import dynamic from 'next/dynamic';
import GuestActions from '@/shared/components/header/GuestAction';
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
      <div className='h-32 w-150 animate-pulse rounded bg-gray-200' />
    </div>
  ),
});

export default function HeaderActions() {
  return <DynamicHeaderActionsContent />;
}
