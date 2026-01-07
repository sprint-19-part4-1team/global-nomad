import { useState } from 'react';
import { useNicknameValidation } from '@/features/mypage/info/hooks/useNicknameValidation';
import { UserServiceResponseDto } from '@/shared/types/user';

/**
 * 프로필 이미지 변경 상태
 * - keep: 변경 없음
 * - upload: 새 이미지 업로드
 * - remove: 기본 이미지로 리셋
 */
export type ProfileImageState =
  | { type: 'keep' }
  | { type: 'upload'; file: File }
  | { type: 'remove' };

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
  const [imageState, setImageState] = useState<ProfileImageState>({
    type: 'keep',
  });

  const {
    nickname,
    setNickname,
    handleChange,
    handleBlur,
    error: nicknameError,
    isValid: isNicknameValid,
  } = useNicknameValidation(user.nickname);

  const resetForm = (nextUser: UserServiceResponseDto) => {
    setNickname(nextUser.nickname);
    setImageState({ type: 'keep' });
  };

  /**
   * 새 이미지 선택
   */
  const handleImageSelect = (file: File) => {
    setImageState({ type: 'upload', file });
  };

  /**
   * 기본 이미지로 변경 (이미지 제거)
   */
  const handleImageReset = () => {
    setImageState({ type: 'remove' });
  };

  const isNicknameDirty = nickname !== user.nickname;
  const isImageDirty = imageState.type !== 'keep';
  const canSubmit = isNicknameValid && (isNicknameDirty || isImageDirty);

  /**
   * 미리보기용 이미지 값
   * - upload → File
   * - remove → null (fallback 이미지)
   * - keep   → 기존 이미지 URL
   */
  const previewImage =
    imageState.type === 'upload'
      ? imageState.file
      : imageState.type === 'remove'
        ? null
        : user.profileImageUrl;

  return {
    nickname,
    nicknameError,
    handleChange,
    handleBlur,
    canSubmit,
    imageState,
    previewImage,
    handleImageSelect,
    handleImageReset,
    resetForm,
  };
};
