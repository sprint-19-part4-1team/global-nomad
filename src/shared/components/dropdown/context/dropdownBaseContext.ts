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
 * ## DropdownBaseContext
 *
 * Dropdown 컴포넌트의 **공통 open 상태**를 관리하는 Context입니다.
 *
 * - ActionDropdown, SelectDropdown 모두에서 사용됩니다.
 * - 선택 값(value)과 관련된 상태는 포함하지 않습니다.
 */
export const DropdownBaseContext = createContext<DropdownBaseContextType | undefined>(undefined);
