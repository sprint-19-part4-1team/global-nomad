import { ReactNode } from 'react';
import Footer from '@/shared/components/footer/Footer';
import HeaderShell from '@/shared/components/header/HeaderShell';

interface BaseLayoutProps {
  header: ReactNode;
  children: ReactNode;
}

export default function BaseLayout({ header, children }: BaseLayoutProps) {
  return (
    <>
      <HeaderShell>{header}</HeaderShell>
      {children}
      <Footer />
    </>
  );
}
