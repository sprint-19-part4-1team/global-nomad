import { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

const TAG_OPTIONS = ['h1', 'h2', 'h3', 'h4', 'div'] as const;
const FONT_SIZES = [32, 24, 20, 18] as const;
const FONT_WEIGHTS = ['bold', 'semibold', 'medium', 'normal'] as const;

/**
 * 프로젝트 공통 Title 컴포넌트
 * @param as - 렌더링할 HTML 태그 (기본값: 'h1')
 * @param size - 폰트 크기 (32, 24, 20, 18 / 기본값: 32)
 * @param weight - 폰트 두께 (bold, semibold, medium, normal / 기본값: 'medium')
 * @param className - 추가 커스텀 스타일
 */
export default function Title({
  as = 'h1',
  size = 32,
  weight = 'medium',
  className,
  children,
}: {
  as?: (typeof TAG_OPTIONS)[number];
  size?: (typeof FONT_SIZES)[number];
  weight?: (typeof FONT_WEIGHTS)[number];
  className?: string;
  children: ReactNode;
}) {
  const Component = as;
  const fontSize = `heading-${size}`;
  const fontWeight = `font-${weight}`;
  return <Component className={cn(fontSize, fontWeight, className)}>{children}</Component>;
}
