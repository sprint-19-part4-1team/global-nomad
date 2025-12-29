import { ReactNode } from 'react';
import MypageTabs from '@/features/mypage/components/MypageTabs';

interface MypageLayoutProps {
  children: ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  // TODO: 마이페이지 공통 레이아웃
  return (
    <>
      <MypageTabs />
      {children}
    </>
  );
}
