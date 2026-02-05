import Dialog, { DialogBaseProps } from '@/shared/components/overlay/dialog/Dialog';
import { DialogAlertProps } from '@/shared/components/overlay/dialog/DialogAlert';
import { DialogConfirmProps } from '@/shared/components/overlay/dialog/DialogConfirm';
import { overlayStore } from './overlayStore';

export type OpenAlertOptions = Omit<DialogAlertProps, 'onClose'> & {
  /** overlay를 식별하기 위한 고유 id */
  id?: string;
  /** alert 닫힘 시 실행할 콜백 */
  onClose?: () => void;
} & DialogBaseProps;

/**
 * ## openAlert
 *
 * @description
 * - alert 형태의 Dialog overlay를 엽니다.
 * - alert 닫힘 시 overlay는 자동으로 제거되며,
 *   필요 시 `onClose` 콜백을 실행할 수 있습니다.
 *
 * @param options - alert 오픈에 필요한 옵션
 * @returns 생성된 overlay id
 *
 * @example
 * ```ts
 * openAlert({
 *   message: '저장되었습니다.',
 * });
 *
 * openAlert({
 *   id: 'empty-search-alert',
 *   message: '검색어를 입력해주세요.',
 * });
 * ```
 */
export const openAlert = ({
  message,
  closeLabel,
  autoCloseAfterMs,
  onClose,
  id,
}: OpenAlertOptions) => {
  const overlayId = id ?? crypto.randomUUID();

  const handleClose = () => {
    onClose?.();
    overlayStore.popById(overlayId);
  };

  overlayStore.push(
    <Dialog
      variant='alert'
      autoCloseAfterMs={autoCloseAfterMs}
      message={message}
      closeLabel={closeLabel}
      onClose={handleClose}
    />,
    overlayId
  );

  return overlayId;
};

export type OpenConfirmOptions = Omit<DialogConfirmProps, 'onCancel'> & {
  /** overlay를 식별하기 위한 고유 id */
  id?: string;
  /** 취소 버튼 클릭 시 실행할 콜백 */
  onCancel?: () => void;
};

/**
 * ## openConfirm
 *
 * @description
 * - confirm 형태의 Dialog overlay를 엽니다.
 * - 확인 / 취소 동작 이후 overlay는 자동으로 제거됩니다.
 *
 * @param options - confirm 오픈에 필요한 옵션
 * @returns 생성된 overlay id
 *
 * @example
 * ```ts
 * openConfirm({
 *   message: '정말 삭제할까요?',
 *   confirmLabel: '삭제',
 *   cancelLabel: '취소',
 *   onConfirm: deleteItem,
 * });
 * ```
 */
export const openConfirm = ({
  message,
  cancelLabel,
  onCancel,
  confirmLabel,
  isConfirm,
  onConfirm,
}: DialogConfirmProps) => {
  const id = crypto.randomUUID();

  const handleConfirm = () => {
    onConfirm?.();
    overlayStore.popById(id);
  };

  const handleCancel = () => {
    onCancel?.();
    overlayStore.popById(id);
  };

  overlayStore.push(
    <Dialog
      variant='confirm'
      message={message}
      cancelLabel={cancelLabel}
      onCancel={handleCancel}
      confirmLabel={confirmLabel}
      isConfirm={isConfirm}
      onConfirm={handleConfirm}
    />,
    id
  );

  return id;
};
