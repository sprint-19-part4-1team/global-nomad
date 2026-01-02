import { Metadata } from 'next';
import { ReactNode } from 'react';

interface SignupLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '회원가입',
};

export default function SignupLayout({ children }: SignupLayoutProps) {
  return <>{children}</>;
}
