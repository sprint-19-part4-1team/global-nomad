import { ReactNode } from 'react';
import useDropdownBaseContext from '@/shared/components/dropdown/hooks/useDropdownBaseContext';
import useSelectContext from '@/shared/components/dropdown/hooks/useSelectContext';
import { dropdownListBase } from '@/shared/components/dropdown/styles/dropdownContent';
import { cn } from '@/shared/utils/cn';

interface SelectDropdownContentProps {
  children: ReactNode;
}

/**
 * ## SelectDropdownContent
 *
 * @description
 * SelectDropdown의 옵션 리스트 영역입니다.
 * - DropdownBaseContext의 `isOpen` 상태에 따라 렌더링됩니다.
 * - 닫힌 상태에서는 DOM에 마운트되지 않습니다.
 *
 * @param children -  SelectDropdownItem을 자식으로 전달
 */
export default function SelectDropdownContent({ children }: SelectDropdownContentProps) {
  const { isOpen } = useDropdownBaseContext();
  const { triggerId } = useSelectContext();

  if (!isOpen) {
    return null;
  }

  return (
    <ul
      role='listbox'
      aria-labelledby={triggerId}
      className={cn(
        dropdownListBase,
        'top-full left-0 mt-8 scrollbar-hidden max-h-332 w-full overflow-y-scroll rounded-16 border border-gray-100 bg-white p-12 shadow-input'
      )}>
      {children}
    </ul>
  );
}
