import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import { HTMLAttributes, ReactNode } from 'react';
import Icons from '@/assets/icons';
import { cn } from '@/shared/utils/cn';

const avatarVariants = cva('aspect-square rounded-full relative', {
  variants: {
    size: {
      sm: 'w-30 h-30',
      md: 'w-70 h-70',
      lg: 'w-120 h-120',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

/**
 * Avatar 컴포넌트의 Props
 * @property {ReactNode} children - Avatar 내부에 렌더링될 자식 요소
 * @property {'sm' | 'md' | 'lg'} [size='sm'] - 아바타 크기 (sm: 30px, md: 70px, lg: 120px)
 */
interface AvatarProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  children: ReactNode;
}

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
 * 사용자 프로필 이미지를 표시하는 아바타 컴포넌트
 *
 * @description
 * - 3가지 크기(sm, md, lg)를 지원합니다
 * - Avatar.Image를 통해 이미지를 표시하며, 이미지가 없을 경우 Fallback 아이콘을 표시합니다
 *
 * @param {AvatarProps} props - Avatar 컴포넌트 props
 * @returns {JSX.Element}
 *
 * @example
 * <Avatar size="md">
 *   <Avatar.Image src="/profile.jpg" name="홍길동" />
 * </Avatar>
 *
 */
export default function Avatar({ size, className, children }: AvatarProps) {
  return <div className={cn(avatarVariants({ size }), className)}>{children}</div>;
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
const AvatarImage = ({ src, name = '유저 아바타', className }: AvatarImageProps) => {
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
};

Avatar.Image = AvatarImage;
