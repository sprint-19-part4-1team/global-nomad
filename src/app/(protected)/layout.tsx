import { ReactNode } from 'react';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  // TODO: 보호된 페이지 공통 레이아웃
  return (
    <>
      <p>보호 라우터 공통 레이아웃</p>
      {children}
    </>
  );
}
