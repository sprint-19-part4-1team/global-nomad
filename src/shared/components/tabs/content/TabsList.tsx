import { ReactNode } from 'react';
import { tabListBase } from '@/shared/components/tabs/styles/tabListBase';

interface TabsListProps {
  children: ReactNode;
}

/**
 * ## TabsList
 *
 * @description
 * TabsTrigger들을 감싸는 컨테이너 컴포넌트입니다.
 *
 * - ARIA Tabs 패턴에 따라 `role="tablist"`를 사용합니다.
 * - 탭은 가로 방향으로 배치되며, `aria-orientation="horizontal"`로 명시됩니다.
 *
 * @param children - TabsTrigger 컴포넌트들을 자식으로 전달
 *
 * @example
 * ```tsx
 *  <TabsList>
 *    <TabsTrigger value="request">신청 0</TabsTrigger>
 *    <TabsTrigger value="approval">승인 0</TabsTrigger>
 *  </TabsList>
 * ```
 */
export default function TabsList({ children }: TabsListProps) {
  return (
    <div role='tablist' aria-orientation='horizontal' className={tabListBase}>
      {children}
    </div>
  );
}
