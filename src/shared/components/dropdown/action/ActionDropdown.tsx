'use client';

import { ReactNode } from 'react';
import DropdownBaseProvider from '@/shared/components/dropdown/root/DropdownBaseProvider';
import DropdownBaseRoot from '@/shared/components/dropdown/root/DropdownBaseRoot';

interface ActionDropdownProps {
  children: ReactNode;
}

/**
 * ## ActionDropdown
 *
 * @description
 * ActionDropdown 컴포넌트의 루트 역할을 하는 컴포넌트입니다.
 *
 * - DropdownBaseProvider를 통해 드롭다운의 open 상태를 관리합니다.
 * - DropdownBaseRoot를 기준 요소로 사용하여,
 *   외부 클릭 시 드롭다운을 닫는 동작을 제공합니다.
 * - `w-fit` 레이아웃을 사용하여
 *   아이콘 버튼, 액션 메뉴 등 콘텐츠 크기에 맞는 드롭다운을 구성합니다.
 *
 * @param children - ActionDropdownTrigger, ActionDropdownContent 등의 조합 컴포넌트
 *
 * @example
 * ```tsx
 * <ActionDropdown>
 *   <ActionDropdownTrigger>트리거할 콘텐츠</ActionDropdownTrigger>
 *   <ActionDropdownContent>
 *     <ActionDropdownItem onClick={수정로직}>수정</ActionDropdownItem>
 *     <ActionDropdownItem onClick={삭제로직}>삭제</ActionDropdownItem>
 *   </ActionDropdownContent>
 * </ActionDropdown>
 * ```
 */
export default function ActionDropdown({ children }: ActionDropdownProps) {
  return (
    <DropdownBaseProvider>
      <DropdownBaseRoot className='w-fit'>{children}</DropdownBaseRoot>
    </DropdownBaseProvider>
  );
}
