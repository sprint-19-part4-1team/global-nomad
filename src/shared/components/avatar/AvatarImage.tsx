import Image from 'next/image';
import { useAvatarContext } from '@/shared/components/avatar/hooks/useAvatarContext';
import { cn } from '@/shared/utils/cn';

/**
 * AvatarImage 컴포넌트의 Props
 * @property {'lazy' | 'eager'} [loading='eager'] - 이미지 로딩 방식 (lazy: 지연 로딩, eager: 즉시 로딩)
 * @property {string} [className] - 추가 CSS 클래스명
 */
interface AvatarImageProps {
  loading?: 'lazy' | 'eager';
  className?: string;
}

/**
 * Avatar 내부에서 사용되는 프로필 이미지 컴포넌트
 *
 * @description
 * - Avatar 컴포넌트 내부에서 사용되며, Context를 통해 사용자 정보를 받아옵니다
 * - Next.js Image 컴포넌트를 사용하여 최적화된 이미지를 렌더링합니다
 * - 이미지 로딩 실패 시 자동으로 Fallback으로 전환됩니다
 * - profileImageUrl이 없으면 null을 반환하여 Fallback이 표시되도록 합니다
 *
 * @param {AvatarImageProps} props - AvatarImage 컴포넌트 props
 * @returns {JSX.Element | null}
 *
 * @example
 * <Avatar user={user} size="md">
 *   <Avatar.Image loading="lazy" />
 *   <Avatar.Fallback />
 * </Avatar>
 */
export default function AvatarImage({ loading = 'eager', className }: AvatarImageProps) {
  const { user, setImageError } = useAvatarContext();

  if (!user.profileImageUrl) {
    return null;
  }

  return (
    <Image
      src={user.profileImageUrl}
      alt={`${user.nickname}님의 프로필`}
      fill
      loading={loading}
      className={cn('object-cover', className)}
      onError={() => setImageError(true)}
    />
  );
}
