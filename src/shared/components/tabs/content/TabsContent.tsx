'use client';

import { ReactNode } from 'react';
import useTabsContext from '@/shared/components/tabs/hooks/useTabsContext';
import { cn } from '@/shared/utils/cn';

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
  forceMount?: boolean;
}

/**
 * ## TabsContent
 *
 * @description
 * 선택된 탭에 대응되는 콘텐츠 영역을 렌더링하는 컴포넌트입니다.
 * TabsContext의 현재 값과 비교하여 노출 여부를 결정합니다.
 *
 * @param value - 이 콘텐츠가 대응되는 탭의 값
 * @param children - 탭 콘텐츠
 * @param className - 추가 스타일링
 * @param forceMount - 비활성 상태에서도 DOM을 유지할지 여부 (기본값: true)
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
