import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { LAYER } from '@/shared/components/overlay/constants/layer';
import { cn } from '@/shared/utils/cn';

const overlaySurfaceVariants = cva(`absolute bg-white shadow-card ${LAYER.overlaySurface}`, {
  variants: {
    /**
     * Surface가 화면에 배치되는 위치
     * - center: 중앙 다이얼로그
     * - bottom: 하단에서 올라오는 시트
     * - right: 우측에서 슬라이드되는 패널
     */
    position: {
      center: 'top-1/2 left-1/2 -translate-1/2',
      bottom: 'left-0 bottom-0',
      right: 'top-0 right-0',
    },
    /**
     * Surface의 기본 형태(크기/레이아웃)
     * - dialog: 중앙 모달용 카드
     * - sheet: 하단 바텀시트
     * - panel: 우측 패널 / 사이드 시트
     */
    variant: {
      dialog: 'max-w-420 w-[calc(100%-48px)]',
      sheet: 'max-h-[70vh] h-full w-full',
      panel: 'h-full w-full sm:max-w-594',
    },
  },
  /**
   * position + variant 조합에 따른 디자인 규칙
   */
  compoundVariants: [
    {
      position: 'bottom',
      variant: 'sheet',
      className: 'rounded-t-24',
    },
    {
      position: 'center',
      variant: 'dialog',
      className: 'rounded-24 sm:rounded-30',
    },
    {
      position: 'right',
      variant: 'panel',
      className: 'rounded-0 sm:rounded-l-30',
    },
  ],
  /**
   * 기본값
   * - 별도 지정이 없으면 중앙 다이얼로그로 동작
   */
  defaultVariants: {
    position: 'center',
    variant: 'dialog',
  },
});

type OverlaySurfaceVariantProps = VariantProps<typeof overlaySurfaceVariants>;

interface SurfaceProps extends OverlaySurfaceVariantProps {
  /** Surface 내부에 렌더링될 콘텐츠 */
  children: ReactNode;
  /** 추가 스타일 대응 */
  className?: string;
}

/**
 * ## OverlaySurface
 *
 * - overlay 계열 컴포넌트의 시각적 `표면`만 담당
 * - role, aria-modal, focus-trap 등 접근성/행동 로직은
 *   Dialog / BottomSheet / Panel 같은 상위 컴포넌트에서 제어하는 것을 권장
 */
export default function OverlaySurface({ children, className, position, variant }: SurfaceProps) {
  return (
    <div className={cn(overlaySurfaceVariants({ position, variant }), className)}>{children}</div>
  );
}
