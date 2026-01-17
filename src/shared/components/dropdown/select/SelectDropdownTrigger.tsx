'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { RefObject } from 'react';
import Icons from '@/assets/icons';
import useDropdownBaseContext from '@/shared/components/dropdown/hooks/useDropdownBaseContext';
import useSelectContext from '@/shared/components/dropdown/hooks/useSelectContext';
import { WithChildren } from '@/shared/types/common';
import { cn } from '@/shared/utils/cn';

const selectDropdownTriggerVariants = cva('flex', {
  variants: {
    variants: {
      basic:
        'w-full justify-between rounded-16 border border-gray-100 bg-white px-16 py-15 shadow-input outline-0 focus-within:border-primary-500',
      shadow: 'gap-4',
    },
  },
  defaultVariants: {
    variants: 'basic',
  },
});

interface SelectDropdownTriggerProps
  extends WithChildren, VariantProps<typeof selectDropdownTriggerVariants> {
  /** variants shadow 타입일 경우 적용할 추가 스타일 */
  className?: string;
  /** Label 클릭 시 트리거에 포커스를 이동시키는 UX를 위해 사용 */
  ref?: RefObject<HTMLButtonElement | null>;
  /** 외부 label과 연결하는 접근성 식별자 */
  ariaLabelledBy?: string;
  /** isError가 `true` 이고 드롭다운이 닫힌 상태일 경우 에러 스타일 적용 */
  isError?: boolean;
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
 * @example
 * ```tsx
 * <SelectDropdownTrigger>
 *   <SelectDropdownValue placeholder='카테고리 입력' />
 * </SelectDropdownTrigger>
 * ```
 */
export default function SelectDropdownTrigger({
  children,
  ref,
  className,
  ariaLabelledBy,
  isError,
}: SelectDropdownTriggerProps) {
  const { isOpen, setIsOpen } = useDropdownBaseContext();
  const { triggerId, variants, onBlur } = useSelectContext();

  return (
    <button
      ref={ref}
      id={triggerId}
      aria-labelledby={ariaLabelledBy}
      type='button'
      aria-haspopup='listbox'
      aria-expanded={isOpen}
      className={cn(
        selectDropdownTriggerVariants({ variants }),
        isError && !isOpen && 'border-red-500',
        className
      )}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={onBlur}>
      {children}
      <Icons.CaretBottom
        aria-hidden
        className={cn('h-24 w-24 transition-transform duration-200', isOpen && 'rotate-180')}
      />
    </button>
  );
}
