import { ReservationStatusBadge } from '@/features/mypage/reservation-list/components/ReservationStatusBadge';
import { useMediaQuery } from '@/features/mypage/reservation-list/hooks/useMediaQuery';
import RoundBox from '@/shared/components/round-box/RoundBox';
import { ReservationStatus } from '@/shared/types/myReservations';

export default function ReservationCard() {
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <div>
      <RoundBox radius={isMobile ? '24' : '32'} className='bg-white px-28 py-32'>
        <ReservationStatusBadge status={ReservationStatus.Canceled} />
      </RoundBox>
      <div>사진</div>
    </div>
  );
}
