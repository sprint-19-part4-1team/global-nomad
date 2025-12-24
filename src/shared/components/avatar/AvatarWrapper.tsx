'use client';

import Avatar from '@/shared/components/avatar/Avatar';
import { User } from '@/shared/types/user';

/**
 * AvatarWrapper 컴포넌트의 Props
 * @property {User} user - 사용자 정보
 * @property {'sm' | 'md' | 'lg'} [size] - 아바타 크기
 */
interface AvatarWrapperProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Avatar 컴포넌트를 감싸는 클라이언트 컴포넌트 래퍼
 *
 * @description
 * - Server Component에서 Avatar를 사용할 수 있도록 Client Component로 분리
 * - 상태 관리가 필요한 Avatar 로직을 클라이언트 측에서 처리
 * - Server Component의 이점(SEO, 초기 로딩 속도)을 유지하면서 Avatar 기능 제공
 *
 * @param {AvatarWrapperProps} props - AvatarWrapper 컴포넌트 props
 * @returns {JSX.Element}
 *
 * @example
 * // Server Component에서 사용
 * <AvatarWrapper user={user} size="lg" />
 */
export default function AvatarWrapper({ user, size }: AvatarWrapperProps) {
  return (
    <Avatar user={user} size={size}>
      <Avatar.Image />
      <Avatar.Fallback />
    </Avatar>
  );
}
