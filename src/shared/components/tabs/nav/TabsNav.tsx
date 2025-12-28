import { ReactNode } from 'react';
import { tabListBase } from '@/shared/components/tabs/styles/tabListBase';
import { cn } from '@/shared/utils/cn';

interface TabsNavProps {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
}

/**
 * ### TabsNav
 *
 * @description
 * 탭 형태의 **페이지 이동용 네비게이션 컨테이너**입니다.
 * - 내부에는 `TabsLink` 컴포넌트만 포함하는 것을 권장합니다.
 * - 시맨틱 태그로 `nav`를 사용하며, `aria-label`을 필수로 요구합니다.
 *
 * @param children - 네비게이션 내부에 렌더링될 TabsLink 컴포넌트들
 * @param ariaLabel - 스크린리더 사용자에게 제공될 네비게이션의 목적 설명
 *
 * @example
 * ```tsx
 * <TabsNav ariaLabel="마이페이지 섹션">
 *   <TabsLink href="/mypage/info" isActive>
 *     내 정보
 *   </TabsLink>
 *   <TabsLink href="/mypage/reservation-list" isActive={false}>
 *     예약 내역
 *   </TabsLink>
 * </TabsNav>
 * ```
 */
export default function TabsNav({ children, ariaLabel, className }: TabsNavProps) {
  return (
    <nav className={cn(tabListBase, className)} aria-label={ariaLabel}>
      {children}
    </nav>
  );
}
