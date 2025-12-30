'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { HTMLAttributes, ReactNode, useState } from 'react';
import { AvatarContext } from '@/shared/components/avatar/context/avatarContext';
import { User } from '@/shared/types/user.type';
import { cn } from '@/shared/utils/cn';

const avatarVariants = cva('aspect-square rounded-full overflow-hidden relative', {
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
 * @property {User} user - 사용자 정보
 * @property {ReactNode} children - AvatarImage와 AvatarFallback 컴포넌트
 * @property {'sm' | 'md' | 'lg'} [size='sm'] - 아바타 크기 (sm: 30px, md: 70px/120px(반응형), lg: 120px)
 * @property {string} [className] - 추가 CSS 클래스
 */
interface AvatarProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  user: User;
  children: ReactNode;
}

/**
 * 사용자 프로필 이미지를 표시하는 아바타 컴포넌트
 *
 * @description
 * - Context API를 통해 하위 컴포넌트(AvatarImage, AvatarFallback)와 상태를 공유합니다
 * - 프로필 이미지가 있고 로딩에 성공하면 AvatarImage를 표시하고, 그렇지 않으면 AvatarFallback을 표시합니다
 * - 3가지 크기(sm, md, lg)를 지원하며, md 크기는 반응형으로 동작합니다
 *
 * @param {AvatarProps} props - Avatar 컴포넌트 props
 * @returns {JSX.Element}
 *
 * @example
 * <Avatar user={user} size="md">
 *   <AvatarImage />
 *   <AvatarFallback />
 * </Avatar>
 */
export default function Avatar({ size, className, user, children }: AvatarProps) {
  // 이미지 로딩 실패 상태
  const [imageError, setImageError] = useState(false);

  return (
    <AvatarContext value={{ user, imageError, setImageError }}>
      <div className={cn(avatarVariants({ size }), className)}>{children}</div>
    </AvatarContext>
  );
}
