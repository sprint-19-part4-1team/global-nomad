import { ReactNode } from 'react';
import BaseLayout from '@/shared/layout/BaseLayout';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return <BaseLayout>{children}</BaseLayout>;
}
