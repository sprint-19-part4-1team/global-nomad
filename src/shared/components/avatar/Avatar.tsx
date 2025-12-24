import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes, ReactNode } from 'react';
import AvatarImage from '@/shared/components/avatar/AvatarImage';
import { cn } from '@/shared/utils/cn';

const avatarVariants = cva('aspect-square rounded-full relative', {
  variants: {
    size: {
      sm: 'w-30 h-30',
      md: 'w-70 h-70 md:w-120 md:h-120',
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

Avatar.Image = AvatarImage;
