'use client';

import { ReactNode, useRef } from 'react';
import useDropdownBaseContext from '@/shared/components/dropdown/hooks/useDropdownBaseContext';
import useEscape from '@/shared/hooks/useEscape';
import useOutsideClick from '@/shared/hooks/useOutsideClick';
import { cn } from '@/shared/utils/cn';

interface DropdownBaseRootProps {
  children: ReactNode;
  className?: string;
}

/**
 * ## DropdownBaseRoot
 *
 * @description
 * Dropdown 계열 컴포넌트의 공통 루트 래퍼 컴포넌트입니다.
 *
 * - Dropdown 전체 영역을 감싸는 기준 요소 역할을 합니다.
 * - `useOutsideClick` 훅을 연결하여,
 *   드롭다운 영역 외부를 클릭했을 때 open 상태를 닫습니다.
 * - `DropdownBaseContext`를 사용해서 `setIsOpen(false)`를 수행합니다.
 *
 * @param children - Dropdown 컴파운트 컴포넌트들
 * @param className - 추가 스타일링
 */
export default function DropdownBaseRoot({ children, className }: DropdownBaseRootProps) {
  const { setIsOpen } = useDropdownBaseContext();
  const rootRef = useRef<HTMLDivElement>(null);

  useOutsideClick(rootRef, () => {
    setIsOpen(false);
  });

  useEscape(() => {
    setIsOpen(false);
  });

  return (
    <div ref={rootRef} className={cn('relative select-none', className)}>
      {children}
    </div>
  );
}
