'use client';

import { ReactNode, useState } from 'react';
import { DropdownBaseContext } from '@/shared/components/dropdown/context/dropdownBaseContext';

interface DropdownBaseProviderProps {
  children: ReactNode;
}

/**
 * ## DropdownBaseProvider
 *
 * @description
 * Dropdown 컴포넌트의 공통 open 상태를 제공하는 Provider 컴포넌트입니다.
 *
 * - DropdownBaseContext에 `isOpen`과 `setIsOpen`을 공급합니다.
 * - ActionDropdown, SelectDropdown 모두에서 사용됩니다.
 * - 선택 값(value)과 관련된 상태는 관리하지 않습니다.
 *
 * @param children - ActionDropdown 또는 SelectDropdown 루트 컴포넌트
 */
export default function DropdownBaseProvider({ children }: DropdownBaseProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return <DropdownBaseContext value={{ isOpen, setIsOpen }}>{children}</DropdownBaseContext>;
}
