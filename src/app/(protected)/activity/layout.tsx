import { ReactNode } from 'react';

interface ActivityLayoutProps {
  children: ReactNode;
}

export default function ActivityLayout({ children }: ActivityLayoutProps) {
  return (
    <>
      <div className='mx-auto w-full max-w-700 px-24 pt-80 sm:px-32 sm:pt-120 lg:px-0 lg:pt-128'>
        {children}
      </div>
    </>
  );
}
