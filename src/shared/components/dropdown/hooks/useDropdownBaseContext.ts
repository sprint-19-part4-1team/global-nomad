import { useContext } from 'react';
import { DropdownBaseContext } from '@/shared/components/dropdown/context/dropdownBaseContext';

/**
 * ## useDropdownBaseContext
 *
 * @description
 * DropdownBaseContext를 사용하기 위한 커스텀 훅입니다.
 * DropdownBaseContext 외부에서 호출하면 에러가 발생합니다.
 */
const useDropdownBaseContext = () => {
  const context = useContext(DropdownBaseContext);

  if (!context) {
    throw new Error('DropdownBaseContext 내부에서 사용하세요.');
  }

  return context;
};

export default useDropdownBaseContext;
