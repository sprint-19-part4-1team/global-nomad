import { ComponentType, useEffect, useRef } from 'react';
import DialogAlert, { DialogAlertProps } from '@/shared/components/overlay/dialog/DialogAlert';
import DialogConfirm, {
  DialogConfirmProps,
} from '@/shared/components/overlay/dialog/DialogConfirm';
import Backdrop from '@/shared/components/overlay/primitives/backdrop/Backdrop';
import OverlayPortal from '@/shared/components/overlay/primitives/overlay-portal/OverlayPortal';
import OverlaySurface from '@/shared/components/overlay/primitives/overlay-surface/OverlaySurface';
import useOutsideClick from '@/shared/hooks/useOutsideClick';

type NeverProps<T> = {
  [K in keyof T]?: never;
};

type DialogPropsMap = { alert: DialogAlertProps; confirm: DialogConfirmProps };

type DialogBaseProps = {
  autoCloseAfterMs?: number;
};

type AlertDialogProps = {
  variant?: 'alert';
} & DialogBaseProps
  & DialogAlertProps
  & NeverProps<Omit<DialogConfirmProps, 'message'>>;

type ConfirmDialogProps = {
  variant: 'confirm';
} & DialogBaseProps
  & DialogConfirmProps
  & NeverProps<Omit<DialogAlertProps, 'message'>>;

type DialogProps = AlertDialogProps | ConfirmDialogProps;

/** Dialog content */
const DIALOG_CONTENT_MAP = {
  alert: DialogAlert,
  confirm: DialogConfirm,
} as const;

/**
 * ## Dialog
 *
 * @description
 * - 사용자에게 메시지를 전달하거나 확인/결정을 요구하기 위한 Dialog 컴포넌트입니다.
 * - `variant`에 따라 서로 다른 콘텐츠(`alert`, `confirm`)를 렌더링합니다.
 * - 내부적으로 `OverlayPortal`, `Backdrop`, `OverlaySurface`를 조합하여
 *   화면 중앙에 모달 형태로 표시됩니다.
 * - `variant`별로 허용되는 props가 분리되어 있으며,
 *   다른 variant 전용 props를 전달할 경우 TypeScript 컴파일 에러가 발생합니다.
 *
 * @param props
 * - 공통 props
 *   - `variant`: Dialog의 타입 (`'alert' | 'confirm'`, 기본값: `'alert'`)
 *   - `message`: 사용자에게 표시할 메시지
 *
 * - `alert` variant
 *   - `closeLabel?`: 닫기 버튼에 표시될 라벨
 *   - `onClose`: 닫기 버튼 클릭 시 실행되는 콜백
 *
 * - `confirm` variant
 *   - `cancelLabel`: 취소 버튼에 표시될 라벨
 *   - `onCancel`: 취소 버튼 클릭 시 실행되는 콜백
 *   - `confirmLabel`: 확인 버튼에 표시될 라벨
 *   - `onConfirm`: 확인 버튼 클릭 시 실행되는 콜백 (비동기 함수 가능)
 *   - `isConfirm?`: 확인 버튼의 로딩 상태
 *
 * @example
 * ```tsx
 * // alert dialog
 * <Dialog
 *   message="저장이 완료되었습니다."
 *   onClose={() => setOpen(false)}
 * />
 *
 * // confirm dialog
 * <Dialog
 *   variant="confirm"
 *   message="정말 삭제하시겠습니까?"
 *   cancelLabel="취소"
 *   confirmLabel="삭제"
 *   onCancel={() => setOpen(false)}
 *   onConfirm={handleDelete}
 * />
 * ```
 */
export default function Dialog({ variant = 'alert', autoCloseAfterMs, ...props }: DialogProps) {
  const Content = DIALOG_CONTENT_MAP[variant] as ComponentType<DialogPropsMap[typeof variant]>;

  const surfaceRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeHandlerRef = useRef<(() => void) | null>(null);

  closeHandlerRef.current =
    variant === 'alert'
      ? (props as DialogAlertProps).onClose
      : (props as DialogConfirmProps).onCancel;

  useEffect(() => {
    if (!autoCloseAfterMs) {
      return;
    }

    timeoutRef.current = setTimeout(() => {
      closeHandlerRef.current?.();
    }, autoCloseAfterMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [autoCloseAfterMs, closeHandlerRef]);

  useOutsideClick(surfaceRef, () => {
    closeHandlerRef.current?.();
  });

  return (
    <OverlayPortal>
      <div role='dialog'>
        <Backdrop />
        <OverlaySurface
          ref={surfaceRef}
          className='flex flex-col items-center justify-center gap-20 px-30 pt-34 pb-30 sm:gap-24 sm:px-40 sm:pt-40'>
          <Content {...props} />
        </OverlaySurface>
      </div>
    </OverlayPortal>
  );
}
