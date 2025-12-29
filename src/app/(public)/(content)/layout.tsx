import { ReactNode } from 'react';
import Footer from '@/shared/components/footer/Footer';
import Header from '@/shared/components/header/Header';
import HeaderShell from '@/shared/components/header/HeaderShell';

interface ContentLayoutProps {
  children: ReactNode;
}

export default function ContentLayout({ children }: ContentLayoutProps) {
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
