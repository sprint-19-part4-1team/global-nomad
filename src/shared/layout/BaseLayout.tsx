import { ReactNode } from 'react';
import Footer from '@/shared/components/footer/Footer';
import Header from '@/shared/components/header/Header';
import HeaderShell from '@/shared/components/header/HeaderShell';

interface BaseLayoutProps {
  children: ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      <HeaderShell>
        <Header />
      </HeaderShell>
      {children}
      <Footer />
    </>
  );
}
