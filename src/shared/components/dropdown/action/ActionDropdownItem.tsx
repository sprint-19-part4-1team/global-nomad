'use client';

import { KeyboardEvent, ReactNode } from 'react';
import useDropdownBaseContext from '@/shared/components/dropdown/hooks/useDropdownBaseContext';
import {
  dropdownItemBase,
  dropdownItemHoverBase,
  dropdownItemShadowStyle,
} from '@/shared/components/dropdown/styles/dropdownItem';
import { moveFocus, moveToEdge } from '@/shared/components/dropdown/utils/focusNavigation';
import { cn } from '@/shared/utils/cn';

interface ActionDropdownItemProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

/**
 * ## ActionDropdownItem
 *
 * @description
 * ActionDropdown에서 사용되는 개별 메뉴 아이템 컴포넌트입니다.
 * - 선택 시 드롭다운을 닫은 후, 전달받은 `onClick` 콜백을 실행합니다.
 *
 * @param children - 메뉴 아이템에 표시될 콘텐츠
 * @param onClick - 메뉴 선택 시 실행될 콜백 함수
 * @param className - 추가로 적용할 클래스 이름 (width 세부 조절 필요 시)
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
