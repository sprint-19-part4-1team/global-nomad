import Image from 'next/image';
import Icons from '@/assets/icons';
import { cn } from '@/shared/utils/cn';

/**
 * AvatarImage 컴포넌트의 Props
 * @property {string | null} [src] - 아바타 이미지 URL (없을 경우 Fallback 아이콘 표시)
 * @property {string} [name='유저 아바타'] - 이미지 대체 텍스트 및 접근성 레이블
 * @property {string} [className] - 추가 CSS 클래스명
 */
interface AvatarImageProps {
  src?: string | null;
  name?: string;
  className?: string;
}

/**
 * Avatar 내부에서 사용되는 이미지 컴포넌트
 *
 * @description
 * - src가 제공되면 Next.js Image 컴포넌트로 이미지를 렌더링합니다
 * - src가 없으면 (null, undefined, "") Fallback 아이콘을 렌더링합니다
 *
 * @param {AvatarImageProps} props - AvatarImage 컴포넌트 props
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * // 이미지가 있을 때
 * <Avatar.Image src="/avatar.jpg" name="사용자 이름" />
 *
 * // 이미지가 없을 때 (Fallback 아이콘 표시)
 * <Avatar.Image />
 * ```
 *
 */
export default function AvatarImage({ src, name = '유저 아바타', className }: AvatarImageProps) {
  // 표시할 아바타 이미지(src)가 존재할 때만 Image 렌더링
  if (src) {
    return (
      <Image fill src={src} className={cn('rounded-full object-cover', className)} alt={name} />
    );
  }

  // 표시할 아바타 이미지(src)가 없을 때 (null, undefined, "") Fallback 아이콘 렌더링
  return (
    <span role='img' aria-label={name} className={className}>
      <Icons.Avatar />
    </span>
  );
}
