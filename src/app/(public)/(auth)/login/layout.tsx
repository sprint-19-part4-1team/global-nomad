import { Metadata } from 'next';
import { ReactNode } from 'react';

interface LoginLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '로그인',
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return <>{children}</>;
}
