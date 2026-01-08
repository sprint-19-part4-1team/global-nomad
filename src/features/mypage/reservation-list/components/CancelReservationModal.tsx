import Icons from '@/assets/icons';
import Button from '@/shared/components/button/Button';
import useBodyScrollLock from '@/shared/components/overlay/hooks/useBodyScrollLock';
import Backdrop from '@/shared/components/overlay/primitives/backdrop/Backdrop';
import OverlaySurface from '@/shared/components/overlay/primitives/overlay-surface/OverlaySurface';

interface CancelReservationModalProps {
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * @description
 * - 예약 취소 여부를 사용자에게 확인하는 모달 컴포넌트입니다.
 * - 모달이 렌더링되는 동안 배경 스크롤을 잠급니다.
 * - 실제 예약 취소 로직은 수행하지 않으며,
 *   확인/닫기 이벤트를 상위 컴포넌트로 전달합니다.
 *
 * @param isPending - 예약 취소 요청 진행 여부 (버튼 비활성화 및 로딩 텍스트 처리)
 * @param onClose - 모달을 닫는 콜백
 * @param onConfirm - 예약 취소를 실행하는 콜백
 */
export default function CancelReservationModal({
  isPending,
  onClose,
  onConfirm,
}: CancelReservationModalProps) {
  useBodyScrollLock(true);

  return (
    <>
      <Backdrop />
      <OverlaySurface variant='dialog' position='center' className='px-30 py-28'>
        <div className='flex flex-col items-center justify-center gap-24'>
          <div className='flex flex-col items-center gap-2'>
            <Icons.SurprisedEarth className='h-49 w-49 sm:h-88 sm:w-88' />
            <span className='body-16 font-bold text-gray-950 sm:body-18'>
              예약을 취소하시겠어요?
            </span>
          </div>

          <div className='grid w-full grid-cols-2 gap-12 sm:px-24'>
            <Button
              full
              variant='secondary'
              size='lg'
              className='font-semibold'
              onClick={onClose}
              disabled={isPending}>
              닫기
            </Button>
            <Button
              full
              size='lg'
              className='font-semibold'
              onClick={onConfirm}
              disabled={isPending}>
              {isPending ? '취소 중...' : '취소하기'}
            </Button>
          </div>
        </div>
      </OverlaySurface>
    </>
  );
}
