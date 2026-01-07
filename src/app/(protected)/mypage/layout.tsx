import { ReactNode } from 'react';
import MypageTabs from '@/features/mypage/common/components/mypage-tabs/MypageTabs';
import Sidemenu from '@/features/mypage/common/components/side-menu/Sidemenu';
import { layoutContainer } from '@/shared/constants/';

interface MypageLayoutProps {
  children: ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  return (
    <main
      className={layoutContainer({
        maxWidth: 980,
        paddingX: 'lgOnlyNone',
        paddingTop: 'lg',
      })}>
      <div className='fixed top-48 left-0 z-6 w-full bg-white'>
        <MypageTabs />
      </div>
      <div className='flex shrink-0 justify-between gap-0 pt-48 sm:gap-30 sm:pt-0 md:gap-48'>
        <Sidemenu />
        <div className='min-w-0 flex-1'>{children}</div>
      </div>
    </main>
  );
}
