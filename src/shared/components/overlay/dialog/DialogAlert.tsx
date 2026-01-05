import { ReactNode } from 'react';
import Button from '@/shared/components/button/Button';

export interface DialogAlertProps {
  message: ReactNode;
  closeLabel?: string;
  onClose: () => void;
}

/**
 * ## DialogAlert
 *
 * @description
 * - 단일 버튼을 가지는 Dialog의 콘텐츠 컴포넌트입니다.
 * - 사용자에게 메시지를 전달하고 Dialog를 종료하는 역할을 합니다.
 * - Dialog 내부에서만 사용되며, 외부에서 직접 사용되지 않습니다.
 *
 * @param message - 사용자에게 표시할 안내 메시지
 * @param closeLabel - 버튼에 표시될 라벨 (기본값: 확인)
 * @param onClose - 버튼 클릭 시 실행되는 콜백
 */
export default function DialogAlert({ message, closeLabel = '확인', onClose }: DialogAlertProps) {
  return (
    <>
      <span className='body-16 font-bold text-gray-950 sm:body-18'>{message}</span>
      <Button className='w-180 sm:w-200' onClick={onClose}>
        {closeLabel}
      </Button>
    </>
  );
}
