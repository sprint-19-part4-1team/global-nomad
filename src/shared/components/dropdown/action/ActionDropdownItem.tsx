'use client';

import { KeyboardEvent } from 'react';
import useDropdownBaseContext from '@/shared/components/dropdown/hooks/useDropdownBaseContext';
import {
  dropdownItemBase,
  dropdownItemHoverBase,
  dropdownItemShadowStyle,
} from '@/shared/components/dropdown/styles/dropdownItem';
import { moveFocus, moveToEdge } from '@/shared/components/dropdown/utils/focusNavigation';
import { WithChildren } from '@/shared/types/common';
import { cn } from '@/shared/utils/cn';

interface ActionDropdownItemProps extends WithChildren {
  /** 메뉴 선택 시 실행될 콜백 함수 */
  onClick: () => void;
  /** 추가로 적용할 스타일 (width 세부 조절 필요 시) */
  className?: string;
}

/**
 * ## ActionDropdownItem
 *
 * @description
 * ActionDropdown에서 사용되는 개별 메뉴 아이템 컴포넌트입니다.
 * - 선택 시 드롭다운을 닫은 후, 전달받은 `onClick` 콜백을 실행합니다.
 *
 * @example
 * ```tsx
 * <ActionDropdownItem onClick={handleEdit}>
 *   수정하기
 * </ActionDropdownItem>
 * ```
 */
export default function ActionDropdownItem({
  children,
  onClick,
  className,
}: ActionDropdownItemProps) {
  const { setIsOpen } = useDropdownBaseContext();

  const executeAction = () => {
    setIsOpen(false);
    onClick();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
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
        executeAction();
        break;
    }
  };

  return (
    <button
      role='menuitem'
      type='button'
      className={cn(dropdownItemBase, dropdownItemHoverBase, dropdownItemShadowStyle, className)}
      onKeyDown={handleKeyDown}
      onClick={executeAction}>
      {children}
    </button>
  );
}
