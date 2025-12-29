import { createContext } from 'react';

/**
 * Dropdown 컴포넌트 Context 타입
 * @property isOpen - 드롭다운이 열려있는지 여부
 * @property setIsOpen - 드롭다운 open 상태를 제어하는 함수
 */
interface DropdownBaseContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

/**
/**
 * ## DropdownBaseContext
 *
 * @description
 * Dropdown의 **열림/닫힘(open)** 상태만 담당하는 베이스 컨텍스트입니다.
 * - ActionDropdown, SelectDropdown에서 공통으로 사용됩니다.
 * - 선택 값(value) 관련 상태는 SelectContext에서 별도로 관리합니다.
 */
export const DropdownBaseContext = createContext<DropdownBaseContextType | undefined>(undefined);
