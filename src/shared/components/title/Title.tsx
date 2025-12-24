import { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

const TAG_OPTIONS = ['h2', 'h3', 'h4', 'h5', 'h6'] as const;
const FONT_SIZES = [32, 24, 20, 18] as const;
const FONT_WEIGHTS = ['bold', 'semibold', 'medium', 'normal'] as const;

type Tag = (typeof TAG_OPTIONS)[number];
type FontSize = (typeof FONT_SIZES)[number];
type FontWeight = (typeof FONT_WEIGHTS)[number];

const SIZE_CLASS: Record<FontSize, string> = {
  32: 'heading-32',
  24: 'heading-24',
  20: 'heading-20',
  18: 'heading-18',
};

const WEIGHT_CLASS: Record<FontWeight, string> = {
  bold: 'font-bold',
  semibold: 'font-semibold',
  medium: 'font-medium',
  normal: 'font-normal',
};

interface TitleProps {
  as?: Tag;
  size?: FontSize;
  weight?: FontWeight;
  className?: string;
  children: ReactNode;
}

/**
 * 프로젝트 공통 Title 컴포넌트
 * @param as - 렌더링할 HTML 태그 (기본값: 'h1')
 * @param size - 폰트 크기 (32, 24, 20, 18 / 기본값: 32)
 * @param weight - 폰트 두께 (bold, semibold, medium, normal / 기본값: 'medium')
 * @param className - 추가 커스텀 스타일
 */
export default function Title({
  as = 'h2',
  size = 32,
  weight = 'medium',
  className,
  children,
}: TitleProps) {
  const Component = as;

  return (
    <Component className={cn(SIZE_CLASS[size], WEIGHT_CLASS[weight], className)}>
      {children}
    </Component>
  );
}
