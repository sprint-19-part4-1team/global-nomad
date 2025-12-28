'use client';

import { KeyboardEvent, ReactNode } from 'react';
import useTabsContext from '@/shared/components/tabs/hooks/useTabsContext';
import { tabItemVariants } from '@/shared/components/tabs/styles/tabItemVariants';
import { cn } from '@/shared/utils/cn';

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
}

/**
 * ## TabsTrigger
 *
 * @description
 * 개별 탭을 나타내는 트리거 버튼 컴포넌트입니다.
 * 선택 상태는 TabsContext의 현재 값과 비교하여 결정됩니다.
 *
 * @param value - 이 탭이 나타내는 값
 * @param children - 탭에 표시될 콘텐츠
 *
 * @example
 * ```tsx
 * <TabsTrigger value="request">신청 0</TabsTrigger>
 * ```
 */
export default function TabsTrigger({ value, children }: TabsTriggerProps) {
  const { value: activeValue, setValue } = useTabsContext();
  const isActive = activeValue === value;

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const { key, currentTarget } = e;

    if (key !== 'ArrowRight' && key !== 'ArrowLeft' && key !== 'Home' && key !== 'End') {
      return;
    }
    e.preventDefault();

    const tabList = currentTarget.parentElement;
    if (!tabList) {
      return;
    }

    const tabs = Array.from(tabList.querySelectorAll<HTMLButtonElement>('[role="tab"]'));

    /** Home키 누르면 탭 첫 번째로 */
    if (key === 'Home') {
      tabs[0].focus();
      tabs[0].click();
      return;
    }

    /** End키 누르면 탭 마지막으로 */
    if (key === 'End') {
      const end = tabs.length - 1;
      tabs[end].focus();
      tabs[end].click();
      return;
    }

    const currentIndex = tabs.indexOf(currentTarget);
    if (currentIndex === -1) {
      return;
    }

    /** 화살표로 탭 이동 */
    const nextIndex =
      key === 'ArrowRight'
        ? (currentIndex + 1) % tabs.length
        : (currentIndex - 1 + tabs.length) % tabs.length;

    tabs[nextIndex].focus();
    tabs[nextIndex].click();
  };

  return (
    <button
      role='tab'
      type='button'
      id={`tab-${value}`}
      aria-controls={`tabpanel-${value}`}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setValue(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        tabItemVariants({ state: isActive ? 'active' : 'inactive' }),
        'cursor-pointer'
      )}>
      {children}
    </button>
  );
}
