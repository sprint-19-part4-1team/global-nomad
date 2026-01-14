import { Metadata } from 'next';
import { WithChildren } from '@/shared/types/common';

export const metadata: Metadata = {
  title: '로그인',
};

export default function LoginLayout({ children }: WithChildren) {
  return <>{children}</>;
}
