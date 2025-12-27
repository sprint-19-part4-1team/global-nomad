import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { LAYER } from '@/shared/components/overlay/constants/layer';
import { cn } from '@/shared/utils/cn';

/**
 * ## overlaySurfaceVariants
 *
 * @description
 * OverlaySurface의 위치(position)와 형태(variant)에 따라
 * 스타일을 조합하기 위한 variant 정의입니다.
 *
 * - 단일 variant로 해결하기 어려운 조합 규칙은 `compoundVariants`에서 관리합니다.
 * - 실제 애니메이션, open/close 로직은 이 레이어에서 다루지 않습니다.
 */
const overlaySurfaceVariants = cva(`fixed bg-white shadow-card ${LAYER.OVERLAY_SURFACE}`, {
  variants: {
    /**
     * ### position
     *
     * @description
     * Surface가 화면에 배치되는 위치를 정의합니다.
     */
    position: {
      center: 'top-1/2 left-1/2 -translate-1/2',
      bottom: 'left-0 bottom-0',
      right: 'top-0 right-0',
    },
    /**
     * ### variant
     *
     * @description
     * Surface의 기본 형태(크기 / 레이아웃 제약)를 정의합니다.
     */
    variant: {
      dialog: 'max-w-420 w-[calc(100%-48px)]',
      sheet: 'max-h-[70vh] h-full w-full',
      panel: 'h-full w-full sm:max-w-594',
    },
  },
  /**
   * ### compoundVariants
   *
   * @description
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
   * ### defaultVariants
   *
   * @description
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
 * @description
 * - overlay 계열 컴포넌트의 시각적 `표면(Surface)`만 담당합니다.
 * - 위치(position)와 형태(variant)에 따른 레이아웃/스타일만 책임집니다.
 * - 열기/닫기, 포커스 트랩, 접근성(role, aria-modal) 등의 행동 로직은
 *   Dialog / BottomSheet / Panel 같은 상위 컴포넌트에서 제어하는 것을 권장합니다.
 *
 * @param - children
 * OverlaySurface 내부에 렌더링될 콘텐츠입니다.
 * 실제 UI 구성은 이 영역에서 이루어집니다.
 *
 * @param - position
 * Surface가 화면에 배치되는 위치입니다.
 * - `'center' | 'bottom' | 'right'`
 *
 * @param - variant
 * Surface의 기본 형태(크기/레이아웃)입니다.
 * - `'dialog' | 'sheet' | 'panel'`
 *
 * @param - className
 * 추가적인 스타일 확장을 위한 클래스입니다.
 * 레이아웃/여백 조정 용도로만 사용하는 것을 권장합니다.
 *
 * @example
 * ```tsx
 * <OverlaySurface position="center" variant="dialog">
 *   <div className="p-30">Dialog Content</div>
 * </OverlaySurface>
 * ```
 */
export default function OverlaySurface({ children, className, position, variant }: SurfaceProps) {
  return (
    <div className={cn(overlaySurfaceVariants({ position, variant }), className)}>{children}</div>
  );
}
