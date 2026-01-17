import { layoutContainer } from '@/shared/constants/';
import { WithChildren } from '@/shared/types/common';

export default function ActivityLayout({ children }: WithChildren) {
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
