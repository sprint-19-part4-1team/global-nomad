'use client';

import useDropdownBaseContext from '@/shared/components/dropdown/hooks/useDropdownBaseContext';
import useSelectContext from '@/shared/components/dropdown/hooks/useSelectContext';
import {
  dropdownListBase,
  dropdownListShadowStyle,
} from '@/shared/components/dropdown/styles/dropdownContent';
import { WithChildren } from '@/shared/types/common';
import { cn } from '@/shared/utils/cn';

interface SelectDropdownContentProps extends WithChildren {
  /** 옵션 리스트 영역에 추가로 적용할 커스텀 스타일 */
  className?: string;
}

const dropdownContentVariants = {
  basic:
    'scrollbar-hidden max-h-332 w-full overflow-y-scroll rounded-16 border border-gray-100 p-12 shadow-input z-5',
  shadow: dropdownListShadowStyle,
} as const;

/**
 * ## SelectDropdownContent
 *
 * @description
 * SelectDropdown의 옵션 리스트 영역입니다.
 * - DropdownBaseContext의 `isOpen` 상태에 따라 렌더링됩니다.
 * - 닫힌 상태에서는 DOM에 마운트되지 않습니다.
 */
export default function SelectDropdownContent({ children, className }: SelectDropdownContentProps) {
  const { isOpen } = useDropdownBaseContext();
  const { triggerId, variants } = useSelectContext();

  if (!isOpen) {
    return null;
  }

  return (
    <ul
      role='listbox'
      aria-labelledby={triggerId}
      className={cn(dropdownListBase, dropdownContentVariants[variants], className)}>
      {children}
    </ul>
  );
}
