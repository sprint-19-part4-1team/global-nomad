'use client';

import useTabsContext from '@/shared/components/tabs/hooks/useTabsContext';
import { WithChildren } from '@/shared/types/common';
import { cn } from '@/shared/utils/cn';

interface TabsContentProps extends WithChildren {
  /** 탭 content에 대응하는 value값 */
  value: string;
  /** 추가 스타일링 */
  className?: string;
  /** 비활성 상태에서도 DOM을 유지할지 여부 (기본값: true) */
  forceMount?: boolean;
}

/**
 * ## TabsContent
 *
 * @description
 * 선택된 탭에 대응되는 콘텐츠 영역을 렌더링하는 컴포넌트입니다.
 * TabsContext의 현재 값과 비교하여 노출 여부를 결정합니다.
 *
 * @example
 * ```tsx
 * <TabsContent value="request">
 *  신청 콘텐츠
 *</TabsContent>
 * ```
 */
export default function TabsContent({
  value,
  children,
  className,
  forceMount = true,
}: TabsContentProps) {
  const { value: activeValue } = useTabsContext();
  const isActive = activeValue === value;

  if (forceMount === false && !isActive) {
    return null;
  }

  return (
    <div
      role='tabpanel'
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      hidden={!isActive}
      className={cn('mt-20 sm:mt-32', className)}>
      {children}
    </div>
  );
}
