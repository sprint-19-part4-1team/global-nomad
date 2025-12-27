import Link from 'next/link';
import { ReactNode } from 'react';
import { tabItemVariants } from '@/shared/components/tabs/styles/tabItemVariants';

interface TabsLinkProps {
  href: string;
  children: ReactNode;
  isActive: boolean;
}

/**
 * ### TabsLink
 *
 * @description
 * 탭 형태로 스타일링된 **페이지 이동용 네비게이션 링크** 컴포넌트입니다.
 * - 내부 콘텐츠를 전환하지 않고 **라우트 이동**을 수행합니다.
 * - 접근성을 위해 `aria-current`를 사용해 현재 위치를 표현합니다.
 * @param children - 탭에 표시될 텍스트 또는 요소
 * @param href - 이동할 페이지의 경로
 * @param isActive - 현재 페이지와 일치하는지 파악하는 활성 상태
 *
 * @example
 * ```tsx
 * <TabsLink href="/mypage/info" isActive>
 *   내 정보
 * </TabsLink>
 * ```
 */
export default function TabsLink({ href, children, isActive }: TabsLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={tabItemVariants({ state: isActive ? 'active' : 'inactive' })}>
      {children}
    </Link>
  );
}
