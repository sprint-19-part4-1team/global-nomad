'use client';

import { TabsContext } from '@/shared/components/tabs/context/tabsContext';
import { WithChildren } from '@/shared/types/common';

interface TabsProps extends WithChildren {
  /** 현재 선택된 탭 */
  value: string;
  /** 선택된 탭이 변경될 때 호출되는 콜백 함수 */
  onChangeValue: (value: string) => void;
  /** 탭에 적용할 추가 스타일 */
  className?: string;
}

/**
 * ## Tabs
 * - 외부에서 상태를 제어하는 컴포넌트 입니다.
 * - 선택된 탭 값과 변경 로직은 외부에서 주입받습니다.
 * - Context를 통해 하위 컴포넌트에 현재 탭 상태와 변경 함수를 제공합니다.
 *
 * @example
 * ```tsx
 * <Tabs>
 *   <TabsList>
 *     <TabsTrigger></TabsTrigger>
 *   </TabsList>
 *   <TabsContent>
 * </Tabs>
 * ```
 */
export default function Tabs({ children, value, onChangeValue, className }: TabsProps) {
  return (
    <TabsContext value={{ value, setValue: onChangeValue }}>
      <div className={className}>{children}</div>
    </TabsContext>
  );
}
