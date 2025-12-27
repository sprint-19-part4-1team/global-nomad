import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/shared/utils/cn';

export const titleVariants = cva('', {
  variants: {
    size: {
      '32': 'heading-32',
      '24': 'heading-24',
      '20': 'heading-20',
      '18': 'heading-18',
    },
    weight: {
      bold: 'font-bold',
      semibold: 'font-semibold',
      medium: 'font-medium',
      normal: 'font-normal',
    },
  },
  defaultVariants: {
    size: '32',
    weight: 'bold',
  },
});

type Tag = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TitleVariantsProps = VariantProps<typeof titleVariants>;

interface TitleProps extends TitleVariantsProps, ComponentPropsWithoutRef<Tag> {
  as?: Tag;
  children: ReactNode;
}

/**
 * 프로젝트 공통 Title 컴포넌트
 * @param as - 렌더링할 HTML 태그 (기본값: 'h2')
 * @param size - 폰트 크기 ('32' | '24' | '20' | '18' / 기본값: '32')
 * @param weight - 폰트 두께 (bold, semibold, medium, normal / 기본값: 'bold')
 * @param className - 추가 커스텀 스타일
 * @example <Title as='h2' size='32' weight='bold'>타이틀</Title>
 */
export default function Title({
  as = 'h2',
  size,
  weight,
  className,
  children,
  ...props
}: TitleProps) {
  const Component = as;

  return (
    <Component className={cn(titleVariants({ size, weight }), className)} {...props}>
      {children}
    </Component>
  );
}
