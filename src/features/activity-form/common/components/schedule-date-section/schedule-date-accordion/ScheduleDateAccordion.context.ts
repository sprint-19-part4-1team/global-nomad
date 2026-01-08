import { createContext, Dispatch, SetStateAction } from 'react';

interface ScheduleDateAccordionContextType {
  /** 아코디언이 열려 있는지 여부 */
  isOpen: boolean;
  /** 아코디언의 열림/닫힘 상태를 변경하는 setter 함수 */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * ### ScheduleDateAccordionContext
 *
 * @description
 * - `ScheduleDateAccordion` 컴포넌트 내부에서 아코디언 상태(`isOpen`)를 공유하기 위한 React Context입니다.
 *
 * @remarks
 * - Provider 없이 사용될 경우를 방지하기 위해 초기값은 `undefined`입니다.
 * - 반드시 `ScheduleDateAccordion` 컴포넌트 하위에서만 사용해야 합니다.
 */
export const ScheduleDateAccordionContext = createContext<
  ScheduleDateAccordionContextType | undefined
>(undefined);
