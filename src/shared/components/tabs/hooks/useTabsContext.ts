import { useContext } from 'react';
import { TabsContext } from '@/shared/components/tabs/context/tabsContext';

const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('TabsContext 내부에서 사용하세요.');
  }

  return context;
};

export default useTabsContext;
