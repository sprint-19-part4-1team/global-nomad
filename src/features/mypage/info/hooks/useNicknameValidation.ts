import { useState } from 'react';
import { validators } from '@/shared/utils/validators';

/**
 * ## useNicknameValidation
 *
 * @description
 * - 마이페이지 프로필 수정에서 사용됩니다.
 * - 닉네임 입력값과 유효성 검사를 관리하기 위한 커스텀 훅입니다.
 *
 * @param initialNickname
 * - 닉네임의 초기값 (서버에서 전달받은 기존 사용자 닉네임)
 *
 * @returns 닉네임 입력 및 유효성 검사 상태를 관리하는 객체
 */
export const useNicknameValidation = (initialNickname: string) => {
  const [nickname, setNickname] = useState(initialNickname);
  const [error, setError] = useState<string>('');

  const isValid = !!nickname && !validators.nickname(nickname);

  const handleChange = (value: string) => {
    setNickname(value);
    if (error) {
      setError('');
    }
  };

  const handleBlur = () => {
    setError(validators.nickname(nickname));
  };

  return {
    nickname,
    setNickname,
    error,
    handleChange,
    handleBlur,
    isValid,
  };
};
