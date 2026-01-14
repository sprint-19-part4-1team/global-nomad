import { createContext } from 'react';

export interface SelectContextType<T> {
  /** 현재 선택된 값 (제네릭 T 타입을 따름) */
  value: T;
  /** 선택한 값으로 변경하는 함수 */
  setValue: (value: T) => void;
  /** 트리거와 리스트를 연결하는 id (접근성 도구용) */
  triggerId: string;
  /** 스타일 변형 옵션 (기본값: basic) */
  variants: 'basic' | 'shadow';
  /** 드롭다운이 포커스를 잃었을 때 호출되는 콜백 */
  onBlur?: () => void;
}

/**
 * ## SelectContext
 *
 * @description
 * SelectDropdown의 선택 상태(value) 와 스타일 정보를 관리하는 전용 Context입니다.
 *
 * - SelectDropdown 계열 컴포넌트에서만 사용됩니다.
 * - Dropdown의 open/close 상태는 관리하지 않습니다.
 * - ActionDropdown에서는 절대 사용하지 마세요!
 */
export const SelectContext = createContext<SelectContextType<any> | undefined>(undefined);
