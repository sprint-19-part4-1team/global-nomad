import Icons from '@/assets/icons';
import { useAvatarContext } from '@/shared/components/avatar/hooks/useAvatarContext';

/**
 * AvatarFallback 컴포넌트의 Props
 * @property {string} [className] - 추가 CSS 클래스명
 */
interface AvatarFallbackProps {
  className?: string;
}

/**
 * 아바타 이미지 로딩 실패 시 표시되는 대체 아이콘 컴포넌트
 *
 * @description
 * - Avatar 컴포넌트 내부에서 사용되며, Context를 통해 사용자 정보를 받아옵니다
 * - 프로필 이미지가 없거나 로딩에 실패한 경우 기본 아바타 아이콘을 표시합니다
 * - 스크린 리더를 위해 사용자 닉네임이 포함된 aria-label을 제공합니다
 *
 * @param {AvatarFallbackProps} props - AvatarFallback 컴포넌트 props
 * @returns {JSX.Element}
 *
 * @example
 * <Avatar user={user} size="md">
 *   <Avatar.Image />
 *   <Avatar.Fallback />
 * </Avatar>
 */
export default function AvatarFallback({ className }: AvatarFallbackProps) {
  const { user, imageError } = useAvatarContext();

  if (user.profileImageUrl || imageError) {
    return null;
  }

  return (
    <span role='img' aria-label={`${user.nickname}님의 프로필`} className={className}>
      <Icons.Avatar />
    </span>
  );
}
