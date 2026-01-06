import { useState } from 'react';
import { useNicknameValidation } from '@/features/mypage/info/hooks/useNicknameValidation';
import { UserServiceResponseDto } from '@/shared/types/user';

/**
 * ## useProfileForm
 *
 * @description
 * - 마이페이지 > 내 정보 수정에서 사용하는 프로필 수정 폼 상태 관리 훅입니다.
 * - 닉네임과 프로필 이미지 변경 여부를 기준으로 폼 제출 가능 여부(`canSubmit`)를 판단합니다.
 *
 * @param user
 * - 현재 로그인한 사용자 정보
 *
 * @returns 프로필 수정 폼 상태 및 핸들러 객체
 */

export const useProfileForm = (user: UserServiceResponseDto) => {
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [isImageDirty, setIsImageDirty] = useState(false);

  const {
    nickname,
    error: nicknameError,
    handleChange,
    handleBlur,
    isValid: isNicknameValid,
  } = useNicknameValidation(user.nickname);

  /**
   * 새 이미지 선택
   */
  const handleImageSelect = (file: File) => {
    setProfileImg(file);
    setIsImageDirty(true);
  };

  /**
   * 기본 이미지로 변경 (이미지 제거)
   */
  const handleImageReset = () => {
    setProfileImg(null);
    setIsImageDirty(Boolean(user.profileImageUrl));
  };

  // 닉네임 검증
  const isNicknameDirty = nickname !== user.nickname;

  // 전체 폼 검증
  const canSubmit = isNicknameValid && (isNicknameDirty || isImageDirty);

  return {
    nickname,
    nicknameError,
    profileImg,
    handleImageSelect,
    handleImageReset,
    canSubmit,
    handleChange,
    handleBlur,
  };
};
