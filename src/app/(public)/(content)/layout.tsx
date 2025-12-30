import { ReactNode } from 'react';
import Header from '@/shared/components/header/Header';
import BaseLayout from '@/shared/layout/BaseLayout';

interface ContentLayoutProps {
  children: ReactNode;
}

export default function ContentLayout({ children }: ContentLayoutProps) {
  // TODO: 로그인한 유저라면 header에 유저 정보 전달 아니라면 전달 X
  return (
    <>
      <BaseLayout header={<Header />}>{children}</BaseLayout>
    </>
  );
}
