import { useCallback, useState } from 'react';

/**
 * 포커스 상태를 관리하는 커스텀 훅
 *
 * @returns {Object} 포커스 상태와 이벤트 핸들러를 포함한 객체
 *
 */
const useFocus = () => {
  // 포커스 상태를 관리하는 상태 (기본값: false - 포커스 해제)
  const [isFocus, setIsFocus] = useState(false);

  /**
   * 요소가 포커스될 때 호출되는 핸들러 함수
   */
  const onFocus = useCallback(() => setIsFocus(true), []);

  /**
   * 요소가 포커스를 잃을 때 호출되는 핸들러 함수
   */
  const onBlur = useCallback(() => setIsFocus(false), []);

  return {
    isFocus, // 현재 포커스 상태 (true: 포커스됨, false: 포커스 해제)
    onFocus, // 포커스 이벤트 핸들러
    onBlur, // 블러 이벤트 핸들러
  };
};

export default useFocus;
