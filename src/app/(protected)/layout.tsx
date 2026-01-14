import BaseLayout from '@/shared/layout/BaseLayout';
import { WithChildren } from '@/shared/types/common';

export default function ProtectedLayout({ children }: WithChildren) {
  return <BaseLayout>{children}</BaseLayout>;
}
