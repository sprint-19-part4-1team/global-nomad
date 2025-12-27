import { ReactNode } from 'react';

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  // TODO: 퍼블릭 페이지 공통 레이아웃
  return (
    <>
      퍼블릭 공통 레이아웃
      {children}
    </>
  );
}
