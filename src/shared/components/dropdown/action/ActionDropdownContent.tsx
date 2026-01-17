'use client';

import useDropdownBaseContext from '@/shared/components/dropdown/hooks/useDropdownBaseContext';
import {
  dropdownListBase,
  dropdownListShadowStyle,
} from '@/shared/components/dropdown/styles/dropdownContent';
import { WithChildren } from '@/shared/types/common';
import { cn } from '@/shared/utils/cn';

interface ActionDropdownContentProps extends WithChildren {
  /** 추가로 적용할 스타일 (position 조절에 활용) */
  className?: string;
}

/**
 * ## ActionDropdownContent
 *
 * @description
 * ActionDropdown의 메뉴 콘텐츠 영역을 담당하는 컴포넌트입니다.
 *
 * - 드롭다운이 열린 상태(`isOpen === true`)일 때만 렌더링됩니다.
 * - 내부에는 `ActionDropdownItem`을 자식으로 배치합니다.
 *
 * @example
 * ```tsx
 * <ActionDropdownContent>
 *   <ActionDropdownItem onClick={handleEdit}>수정하기</ActionDropdownItem>
 *   <ActionDropdownItem onClick={handleDelete}>삭제하기</ActionDropdownItem>
 * </ActionDropdownContent>
 * ```
 */
export default function ActionDropdownContent({ children, className }: ActionDropdownContentProps) {
  const { isOpen } = useDropdownBaseContext();

  if (!isOpen) {
    return null;
  }

  return (
    <div role='menu' className={cn(dropdownListBase, dropdownListShadowStyle, className)}>
      {children}
    </div>
  );
}
