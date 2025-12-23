import { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

const RADIUS_VARIANTS = {
  '24': 'rounded-24',
  '32': 'rounded-32',
} as const;

interface RoundBoxProps {
  children: ReactNode;
  className?: string;
  radius?: keyof typeof RADIUS_VARIANTS;
}

/**
 * 공통 라운드 박스 컨테이너 컴포넌트입니다.
 * * '24'와 '32'를 제외한 radius 값은 허용하지 않음
 * @param children - 박스 내부에 렌더링될 요소 (이미지, 텍스트, 아이콘 등)
 * @param className - 부모 컨테이너의 레이아웃을 결정할 추가 CSS 클래스
 * @param radius - 테두리 곡률 선택지 ('24' | '32', 기본값: '24')
 */
export default function RoundBox({ children, className, radius = '24' }: RoundBoxProps) {
  return (
    <div className={cn('overflow-hidden', RADIUS_VARIANTS[radius], className)}>{children}</div>
  );
}
