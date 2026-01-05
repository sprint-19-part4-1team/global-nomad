import { ReactNode } from 'react';
import { layoutContainer } from '@/shared/constants/';

interface ActivityLayoutProps {
  children: ReactNode;
}

export default function ActivityLayout({ children }: ActivityLayoutProps) {
  return (
    <main
      className={layoutContainer({
        maxWidth: 700,
        paddingX: 'customSm32',
        paddingTop: 'lg',
      })}>
      {children}
    </main>
  );
}
