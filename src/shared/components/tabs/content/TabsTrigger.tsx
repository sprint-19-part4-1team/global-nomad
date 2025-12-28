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

    const currentIndex = tabs.indexOf(currentTarget);
    if (currentIndex === -1) {
      return;
    }

    let nextIndex = currentIndex;

    if (key === 'Home') {
      nextIndex = 0;
    } else if (key === 'End') {
      nextIndex = tabs.length - 1;
    } else if (key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    }

    const nextTab = tabs[nextIndex];

    nextTab.focus();

    const nextValue = nextTab.dataset.value;
    if (nextValue) {
      setValue(nextValue);
    }
  };

  return (
    <button
      role='tab'
      type='button'
      data-value={value}
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
