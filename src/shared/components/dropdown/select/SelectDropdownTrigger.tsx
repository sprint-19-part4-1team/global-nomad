'use client';

import { ReactNode } from 'react';
import Icons from '@/assets/icons';
import useDropdownBaseContext from '@/shared/components/dropdown/hooks/useDropdownBaseContext';
import useSelectContext from '@/shared/components/dropdown/hooks/useSelectContext';
import { cn } from '@/shared/utils/cn';

interface SelectDropdownTriggerProps {
  children: ReactNode;
}

/**
 * ## SelectDropdownTrigger
 *
 * @description
 * SelectDropdown의 트리거 역할을 하는 버튼 컴포넌트입니다.
 *
 * - 클릭 시 드롭다운의 open / close 상태를 토글합니다.
 * - SelectDropdownValue를 자식으로 받아 현재 선택된 값을 표시합니다.
 * - 화살표 아이콘은 open 상태에 따라 회전합니다.
 *
 * @param children - SelectDropdownValue 등 트리거 내부에 표시될 콘텐츠
 *
 * @example
 * ```tsx
 * <SelectDropdownTrigger>
 *   <SelectDropdownValue placeholder='카테고리 입력' />
 * </SelectDropdownTrigger>
 * ```
 */
export default function SelectDropdownTrigger({ children }: SelectDropdownTriggerProps) {
  const { isOpen, setIsOpen } = useDropdownBaseContext();
  const { triggerId } = useSelectContext();

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      id={triggerId}
      type='button'
      aria-haspopup='listbox'
      aria-expanded={isOpen}
      className='flex w-full cursor-pointer justify-between rounded-16 border border-gray-100 bg-white px-16 py-15 shadow-input'
      onClick={handleOpenDropdown}>
      {children}
      <Icons.CaretBottom
        aria-hidden
        className={cn(
          'h-24 w-24 text-gray-950 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  );
}
