import { ReactNode } from 'react';
import Footer from '@/shared/components/footer/Footer';
import Header from '@/shared/components/header/Header';
import HeaderShell from '@/shared/components/header/HeaderShell';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
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
