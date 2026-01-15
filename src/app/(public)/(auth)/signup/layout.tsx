import { Metadata } from 'next';
import { WithChildren } from '@/shared/types/common';

export const metadata: Metadata = {
  title: '회원가입',
};

export default function SignupLayout({ children }: WithChildren) {
  return <>{children}</>;
}
