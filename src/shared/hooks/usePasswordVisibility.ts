import { useState } from 'react';

/**
 * 비밀번호 표시/숨김 상태를 관리하는 커스텀 훅
 * @returns {Object} 비밀번호 가시성 상태와 토글 함수를 포함한 객체
 */
const usePasswordVisibility = () => {
  // 비밀번호 표시 여부를 관리하는 상태 (기본값: false - 숨김)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  /**
   * 비밀번호 표시/숨김 상태를 토글하는 함수
   */
  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return {
    isPasswordVisible, // 현재 비밀번호 표시 여부 (true: 표시, false: 숨김)
    handlePasswordVisibility, // 비밀번호 표시/숨김을 토글하는 함수
  };
};

export default usePasswordVisibility;
