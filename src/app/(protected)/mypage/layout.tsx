import { ReactNode } from 'react';

interface MypageLayoutProps {
  children: ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  // TODO: 마이페이지 공통 레이아웃
  return (
    <>
      마이페이지 공통 레이아웃
      {children}
    </>
  );
}
