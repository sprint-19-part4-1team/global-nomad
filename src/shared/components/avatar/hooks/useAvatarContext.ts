import { useContext } from 'react';
import { AvatarContext } from '@/shared/components/avatar/context/avatarContext';

/**
 * Avatar Context를 사용하기 위한 커스텀 훅
 *
 * @description AvatarContext의 값을 안전하게 가져오며, Provider 외부에서 사용 시 에러를 발생시킵니다.
 * @returns {AvatarContextType} user 정보와 setImageError 함수를 포함한 Context 값
 * @throws {Error} AvatarContext.Provider 외부에서 호출 시 에러 발생
 *
 *  @example
 * function AvatarImg() {
 *   const { user, setImageError } = useAvatarContext();
 *   return <img src={user.profileImageUrl} onError={() => setImageError(true)} />;
 * }
 */
export const useAvatarContext = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatarContext must be used within AvatarContext.Provider');
  }
  return context;
};
