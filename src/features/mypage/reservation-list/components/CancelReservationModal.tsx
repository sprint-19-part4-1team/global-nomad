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
