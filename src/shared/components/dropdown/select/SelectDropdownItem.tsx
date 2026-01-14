'use client';

import { cva } from 'class-variance-authority';
import { KeyboardEvent } from 'react';
import useDropdownBaseContext from '@/shared/components/dropdown/hooks/useDropdownBaseContext';
import useSelectContext from '@/shared/components/dropdown/hooks/useSelectContext';
import {
  dropdownItemHoverBase,
  dropdownItemBase,
  dropdownItemShadowStyle,
} from '@/shared/components/dropdown/styles/dropdownItem';
import { moveFocus, moveToEdge } from '@/shared/components/dropdown/utils/focusNavigation';
import { WithChildren } from '@/shared/types/common';
import { cn } from '@/shared/utils/cn';

export const dropdownItemVariants = cva(dropdownItemBase, {
  variants: {
    variants: {
      basic: 'rounded-12 px-20 py-12 body-14 sm:body-16',
      shadow: dropdownItemShadowStyle,
    },
    disabled: {
      true: 'cursor-not-allowed bg-gray-25 text-gray-400',
      false: 'text-gray-800 hover:font-bold',
    },
    selected: {
      true: 'font-bold text-primary-500',
      false: '',
    },
  },
  compoundVariants: [
    {
      disabled: false,
      className: dropdownItemHoverBase,
    },
  ],
  defaultVariants: {
    variants: 'basic',
    disabled: false,
    selected: false,
  },
});

interface SelectDropdownItemProps<T = string> extends WithChildren {
  /** 옵션의 실제 선택 값 */
  value: T;
  /** 옵션 비활성화 여부 */
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
 * @example
 * ```tsx
 * <SelectDropdownItem value={문화 · 예술}>🎨 문화 · 예술</SelectDropdownItem>
 * ```
 */
export default function SelectDropdownItem<T = string>({
  children,
  value,
  disabled = false,
}: SelectDropdownItemProps<T>) {
  const { setIsOpen } = useDropdownBaseContext();
  const { value: selectedValue, setValue, variants } = useSelectContext<T>();

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

    const current = e.currentTarget;
    const key = e.key;

    if (
      key === 'ArrowDown'
      || key === 'ArrowUp'
      || key === 'Home'
      || key === 'End'
      || key === 'Enter'
      || key === ' '
    ) {
      e.preventDefault();
    } else {
      return;
    }

    switch (key) {
      case 'ArrowDown':
        moveFocus(current, 'next');
        break;

      case 'ArrowUp':
        moveFocus(current, 'prev');
        break;

      case 'Home':
        moveToEdge(current, 'first');
        break;

      case 'End':
        moveToEdge(current, 'last');
        break;

      case 'Enter':
      case ' ':
        selectOption();
        break;
    }
  };

  return (
    <li
      role='option'
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      className={cn(dropdownItemVariants({ variants, disabled, selected: isSelected }))}
      onClick={selectOption}
      onKeyDown={handleKeyDown}>
      {children}
    </li>
  );
}
