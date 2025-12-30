import { ReactNode } from 'react';
import MypageTabs from '@/features/mypage/components/MypageTabs';
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
      <div className='pt-48 sm:pt-0'>
        <aside>사이드</aside>
        {children}
      </div>
    </main>
  );
}
