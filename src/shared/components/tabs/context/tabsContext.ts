import { createContext } from 'react';

/**
 * Tabs 컴포넌트 Context 타입
 * @property value - 현재 선택된 탭의 값
 * @property setValue - 선택된 탭 값을 변경하는 함수
 */
interface TabContextType {
  value: string;
  setValue: (value: string) => void;
}

/**
 * TabsContext
 *
 * @description
 * Tabs 컴포넌트와 하위 컴포넌트(TabsList, TabsTrigger, TabsContent) 간에
 * 현재 선택된 탭 상태와 변경 함수를 공유하기 위한 Context입니다.
 *
 * - Tabs Root에서 제공됩니다.
 * - 하위 컴포넌트에서는 `useTabsContext` 훅을 통해 접근하는 것을 권장합니다.
 */
export const TabsContext = createContext<TabContextType | undefined>(undefined);
