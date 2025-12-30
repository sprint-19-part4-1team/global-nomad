import { ReactNode } from 'react';
import Logo from '@/shared/components/logo/Logo';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='mx-auto w-full max-w-640 px-24 pt-60 sm:px-0 sm:pt-140'>
      <div className='mx-auto w-144 sm:w-255'>
        <Logo variant='login' />
      </div>
      <main className='mt-40 sm:mt-60'>{children}</main>
    </div>
  );
}
