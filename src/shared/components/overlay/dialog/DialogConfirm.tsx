import { ReactNode } from 'react';
import Icons from '@/assets/icons';
import Button from '@/shared/components/button/Button';

export interface DialogConfirmProps {
  message: ReactNode;
  cancelLabel?: string;
  onCancel: () => void;
  confirmLabel: string;
  onConfirm: () => void | Promise<void>;
  isConfirm?: boolean;
}

/**
 * ## DialogConfirm
 *
 * @description
 * - 두 개의 버튼(취소 / 확인)을 가지는 Dialog의 콘텐츠 컴포넌트입니다.
 * - 사용자에게 결정을 요구하는 상황에서 사용됩니다.
 * - Dialog 내부에서만 사용되며, 외부에서 직접 사용되지 않습니다.
 *
 * @param message - 사용자에게 표시할 안내 메세지
 * @param cancelLabel - 취소 버튼에 표시될 라벨 (기본값: 취소하기)
 * @param onCancel - 취소 버튼 클릭 시 실행되는 콜백
 * @param confirmLabel - 확인 버튼에 표시될 라벨
 * @param onConfirm - 확인 버튼 클릭 시 실행되는 콜백으로 삭제, 저장 등 실제 행동을 수행한 뒤 Dialog를 닫는 용도로 사용됩니다.
 * @param isConfirm - `true`일 경우 확인 버튼에 로딩 상태를 표시하고 중복 클릭을 방지합니다.
 */
export default function DialogConfirm({
  message,
  cancelLabel = '취소하기',
  onCancel,
  confirmLabel,
  onConfirm,
  isConfirm = false,
}: DialogConfirmProps) {
  return (
    <>
      <div className='flex flex-col items-center gap-2'>
        <Icons.SurprisedEarth className='w-49 sm:w-88' />
        <span className='body-16 font-bold text-gray-950 sm:body-18'>{message}</span>
      </div>
      <div className='flex w-full gap-12 sm:px-24'>
        <Button variant='secondary' full onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button isLoading={isConfirm} full onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </>
  );
}
