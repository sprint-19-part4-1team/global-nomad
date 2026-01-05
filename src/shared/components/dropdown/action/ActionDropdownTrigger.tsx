'use client';

import { ReactNode } from 'react';
import useDropdownBaseContext from '@/shared/components/dropdown/hooks/useDropdownBaseContext';
import { cn } from '@/shared/utils/cn';

interface ActionDropdownTriggerProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * ## ActionDropdownTrigger
 *
 * @description
 * ActionDropdown의 트리거 역할을 하는 버튼 컴포넌트입니다.
 *
 * - 클릭 시 드롭다운의 open / close 상태를 토글합니다.
 * - `button` 요소를 사용하여 기본적인 키보드 접근성을 제공합니다.
 * - `aria-haspopup="menu"`와 `aria-expanded`를 통해
 *   스크린 리더에 메뉴 상태를 전달합니다.
 *
 * @param children - 트리거 내부에 표시될 콘텐츠
 * @param className - 트리거 버튼에 추가로 적용할 클래스 이름
 * @param ariaLabel - 트리거 내부 콘텐츠가 아이콘일때 적용할 aria-label
 *
 * @example
 * ```tsx
 * <ActionDropdownTrigger ariaLabel='더보기 메뉴'>
 *   <Icons.More />
 * </ActionDropdownTrigger>
 * ```
 */
export default function ActionDropdownTrigger({
  children,
  className,
  ariaLabel,
}: ActionDropdownTriggerProps) {
  const { isOpen, setIsOpen } = useDropdownBaseContext();

  return (
    <button
      type='button'
      aria-haspopup='menu'
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      className={cn('cursor-pointer', className)}
      onClick={() => setIsOpen((prev) => !prev)}>
      {children}
    </button>
  );
}
