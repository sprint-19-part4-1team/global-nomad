'use client';

import { KeyboardEvent, ReactNode } from 'react';
import useDropdownBaseContext from '@/shared/components/dropdown/hooks/useDropdownBaseContext';
import useSelectContext from '@/shared/components/dropdown/hooks/useSelectContext';
import {
  dropdownItemHoverBase,
  dropdownItemBase,
} from '@/shared/components/dropdown/styles/dropdownItem';
import { cn } from '@/shared/utils/cn';

interface SelectDropdownItemProps {
  children: ReactNode;
  value: string;
  disabled?: boolean;
}

/**
 * ## SelectDropdownItem
 *
 * @description
 * SelectDropdown 내에서 하나의 선택 가능한 옵션을 표현하는 컴포넌트입니다.
 *
 * - `value`를 기준으로 현재 선택 상태를 판단합니다.
 * - 클릭 또는 키보드(Enter / Space)로 선택할 수 있습니다.
 * - 선택 시 값을 변경하고 드롭다운을 닫습니다.
 * - `disabled` 상태인 경우 선택 및 포커스를 차단합니다.
 *
 * @param children - 옵션에 표시될 콘텐츠 (텍스트, 아이콘 등)
 * @param value - 옵션의 실제 선택 값
 * @param disabled - 옵션 비활성화 여부
 */
export default function SelectDropdownItem({
  children,
  value,
  disabled = false,
}: SelectDropdownItemProps) {
  const { setIsOpen } = useDropdownBaseContext();
  const { value: selectedValue, setValue } = useSelectContext();

  const isSelected = selectedValue === value;

  const selectOption = () => {
    if (disabled) {
      return;
    }
    setValue(value);
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if (disabled) {
      return;
    }

    if (e.key !== 'Enter' && e.key !== ' ') {
      return;
    }

    e.preventDefault();
    selectOption();
  };

  return (
    <li
      role='option'
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        dropdownItemBase,
        'rounded-12 px-20 py-12 body-14 sm:body-16',
        !disabled && dropdownItemHoverBase,
        disabled ? 'cursor-not-allowed bg-gray-25 text-gray-400' : 'text-gray-800 hover:font-bold',
        isSelected && 'font-bold text-primary-500'
      )}
      onClick={selectOption}
      onKeyDown={handleKeyDown}>
      {children}
    </li>
  );
}
