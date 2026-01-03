import { ReactNode } from 'react';
import BaseLayout from '@/shared/layout/BaseLayout';

interface ContentLayoutProps {
  children: ReactNode;
}

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <>
      <BaseLayout>{children}</BaseLayout>
    </>
  );
}
