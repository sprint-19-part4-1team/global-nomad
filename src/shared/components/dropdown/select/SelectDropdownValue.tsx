'use client';

import { ReactNode } from 'react';
import useSelectContext from '@/shared/components/dropdown/hooks/useSelectContext';
import { cn } from '@/shared/utils/cn';

interface SelectDropdownValueProps {
  placeholder?: string;
  render?: (value: string) => ReactNode;
  placeholderClassName?: string;
  valueClassName?: string;
}

const dropdownValueStyle = 'body-14 sm:body-16 font-medium text-gray-800';

/**
 * ## SelectDropdownValue
 *
 * @description
 * SelectDropdownTrigger 내부에서 현재 선택된 값을 표시하는 컴포넌트입니다.
 *
 * - SelectContext의 `value`를 기반으로 렌더링됩니다.
 * - 값이 없는 경우 `placeholder`를 표시합니다.
 * - `render` 함수가 제공되면,
 *   선택된 value를 기반으로 사용자 정의 UI를 렌더링할 수 있습니다.
 *
 * @param placeholder - 선택된 값이 없을 때 표시할 텍스트
 * @param render - 선택된 value를 받아 커스텀 UI를 반환하는 렌더 함수
 * @param placeholderClassName - placeholder 텍스트에 적용할 추가 클래스
 * @param valueClassName - 선택된 값 텍스트에 적용할 추가 클래스
 *
 * @example
 * ```tsx
 * <SelectDropdownTrigger>
 *   <SelectDropdownValue placeholder="카테고리 선택" />
 * </SelectDropdownTrigger>
 *
 * <SelectDropdownTrigger>
 *   <SelectDropdownValue
 *     placeholder='카테고리 선택'
 *     render={(value) => CATEGORY_OPTIONS.find((opt) => opt.value === value)?.label}
 *   />
 * </SelectDropdownTrigger>
 * ```
 */
export default function SelectDropdownValue({
  placeholder,
  render,
  placeholderClassName,
  valueClassName,
}: SelectDropdownValueProps) {
  const { value } = useSelectContext();

  if (!value) {
    return (
      <span className={cn('body-14 text-gray-400 sm:body-16', placeholderClassName)}>
        {placeholder}
      </span>
    );
  }

  return (
    <span className={cn(dropdownValueStyle, valueClassName)}>{render ? render(value) : value}</span>
  );
}
