import Image from 'next/image';
import Icons from '@/assets/icons';
import { ReservationStatus } from '@/shared/types/myReservations';

interface ReservationCardImageProps {
  imageUrl: string;
  status: ReservationStatus;
  reviewSubmitted: boolean;
}

export default function ReservationCardImage({
  imageUrl,
  status,
  reviewSubmitted,
}: ReservationCardImageProps) {
  const isReviewCompleted = status === ReservationStatus.Completed && reviewSubmitted;

  return (
    <div className='absolute inset-y-0 right-0 w-[38%] overflow-hidden bg-primary-200'>
      <div className='relative h-full w-full'>
        <Image src={imageUrl} alt='썸네일 이미지' fill className='object-cover' />

        {isReviewCompleted && (
          <>
            <div className='absolute inset-0 bg-black/30' />
            <div className='absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2'>
              <Icons.CompleteEarth className='h-90 w-90' />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
