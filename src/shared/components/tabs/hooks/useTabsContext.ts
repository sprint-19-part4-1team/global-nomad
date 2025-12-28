import { useContext } from 'react';
import { TabsContext } from '@/shared/components/tabs/context/tabsContext';

/**
 * ## useTabsContext
 *
 * @description
 * TabsContext를 사용하기 위한 커스텀 훅입니다.
 * TabsContext 외부에서 호출하면 에러가 발생합니다.
 */
const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('TabsContext 내부에서 사용하세요.');
  }

  return context;
};

export default useTabsContext;
