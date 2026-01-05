import { ReactNode } from 'react';
import Logo from '@/shared/components/logo/Logo';
import { layoutContainer } from '@/shared/constants/';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main
      className={layoutContainer({
        maxWidth: 640,
        paddingX: 'noneOnSm',
        paddingTop: 'sm',
      })}>
      <div className='mx-auto w-144 sm:w-255'>
        <Logo variant='login' />
      </div>
      <div className='mt-40 pb-100 sm:mt-60'>{children}</div>
    </main>
  );
}
