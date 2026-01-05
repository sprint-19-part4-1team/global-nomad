import { useContext } from 'react';
import { SelectContext } from '@/shared/components/dropdown/context/selectContext';

/**
 * ## useSelectContext
 *
 * @description
 * SelectContext 사용하기 위한 커스텀 훅입니다.
 * SelectContext 외부에서 호출하면 에러가 발생합니다.
 */
const useSelectContext = () => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error('SelectContext 내부에서 사용하세요.');
  }

  return context;
};

export default useSelectContext;
