import { createContext } from 'react';

/**
 * SelectDropdown 컴포넌트 Context 타입
 * @property value - 현재 선택된 값
 * @property setValue - 선택 값을 변경하는 함수
 */
interface SelectContextType {
  value: string;
  setValue: (value: string) => void;
}

/**
 * ## SelectContext
 *
 * SelectDropdown의 **선택 상태(value)** 를 관리하는 전용 Context입니다.
 *
 * - SelectDropdown 계열 컴포넌트에서만 사용됩니다.
 * - Dropdown의 open/close 상태는 관리하지 않습니다.
 * - ActionDropdown에서는 절대 사용하지 마세요!
 */
export const SelectContext = createContext<SelectContextType | undefined>(undefined);
