'use client';

import { useId } from 'react';
import { SelectContext } from '@/shared/components/dropdown/context/selectContext';
import DropdownBaseProvider from '@/shared/components/dropdown/root/DropdownBaseProvider';
import DropdownBaseRoot from '@/shared/components/dropdown/root/DropdownBaseRoot';
import { WithChildren } from '@/shared/types/common';

interface SelectDropdownProps<T = string> extends WithChildren {
  /** 현재 선택된 값 (제네릭 T 타입을 따름) */
  value: T;
  /** 선택 값 변경 핸들러 */
  onChangeValue: (value: T) => void;
  /** 트리거 버튼에 사용할 id (미지정 시 자동 생성) */
  triggerId?: string;
  /** SelectDropdown 스타일 변형 (기본값: basic) */
  variants?: 'basic' | 'shadow';
  /** 드롭다운이 포커스를 잃을 때 호출되는 콜백 */
  onBlur?: () => void;
}

/**
 * ## SelectDropdown
 *
 * @description
 * SelectDropdown의 루트 컴포넌트입니다.
 *
 * - 선택 값(value)과 변경 핸들러를 제어하는 controlled 컴포넌트입니다.
 * - SelectContext를 통해 value / triggerId / variants를 하위 컴포넌트에 제공합니다.
 * - DropdownBaseProvider를 통해 드롭다운의 open 상태를 관리합니다.
 * - 내부적으로 DropdownBaseRoot를 사용하여 외부 클릭 시 드롭다운을 닫습니다.
 *
 * @example
 * ```tsx
 *   <SelectDropdown
 *     triggerId="category-filter"
 *     value={value}
 *     onChangeValue={setValue}>
 *     <SelectDropdownTrigger>
 *       <SelectDropdownValue
 *         placeholder="카테고리 선택"
 *         render={(value) =>
 *           CATEGORY_OPTIONS.find((opt) => opt.value === value)?.label}/>
 *     </SelectDropdownTrigger>
 *     <SelectDropdownContent>
 *       {CATEGORY_OPTIONS.map((opt) => (
 *         <SelectDropdownItem key={opt.value} value={opt.value}>
 *           {opt.label}
 *         </SelectDropdownItem>
 *       ))}
 *     </SelectDropdownContent>
 *   </SelectDropdown>
 * ```
 */
export default function SelectDropdown<T = string>({
  children,
  value,
  onChangeValue,
  triggerId: triggerIdProp,
  variants = 'basic',
  onBlur,
}: SelectDropdownProps<T>) {
  const autoId = useId();
  const triggerId = triggerIdProp ?? `select-trigger-${autoId}`;

  return (
    <SelectContext value={{ value, setValue: onChangeValue, triggerId, variants, onBlur }}>
      <DropdownBaseProvider>
        <DropdownBaseRoot className='w-full'>{children}</DropdownBaseRoot>
      </DropdownBaseProvider>
    </SelectContext>
  );
}
