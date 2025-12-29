'use client';

import { ReactNode, useRef } from 'react';
import useDropdownBaseContext from '@/shared/components/dropdown/hooks/useDropdownBaseContext';
import useOutsideClick from '@/shared/hooks/useOutsideClick';

interface SelectDropdownRootProps {
  children: ReactNode;
}

/**
 * ## SelectDropdownRoot
 *
 * @description
 * SelectDropdown 내부에서만 사용되는 루트 래퍼 컴포넌트입니다.
 *
 * - SelectDropdown 전체 영역을 감싸는 기준 요소 역할을 합니다.
 * - `useOutsideClick` 훅을 연결하여,
 *   드롭다운 영역 외부를 클릭했을 때 open 상태를 닫습니다.
 * - `DropdownBaseContext`를 소비하여 `setIsOpen(false)`를 수행합니다.
 */
export default function SelectDropdownRoot({ children }: SelectDropdownRootProps) {
  const { setIsOpen } = useDropdownBaseContext();
  const rootRef = useRef<HTMLDivElement>(null);

  useOutsideClick(rootRef, () => {
    setIsOpen(false);
  });

  return (
    <div ref={rootRef} className='relative w-full'>
      {children}
    </div>
  );
}
