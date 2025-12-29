import { ReactNode } from 'react';
import MypageTabs from '@/features/mypage/components/MypageTabs';

interface MypageLayoutProps {
  children: ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  return (
    <div className='mx-auto w-full max-w-980 px-24 pt-80 sm:pt-120 lg:px-0 lg:pt-128'>
      <div className='fixed top-48 left-0 z-6 w-full bg-white'>
        <MypageTabs />
      </div>
      <div className='pt-48 sm:pt-0'>{children}</div>
    </div>
  );
}
