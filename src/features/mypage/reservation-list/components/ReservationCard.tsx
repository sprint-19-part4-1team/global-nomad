import Image from 'next/image';
import { ReservationStatusBadge } from '@/features/mypage/reservation-list/components/ReservationStatusBadge';
import { useMediaQuery } from '@/features/mypage/reservation-list/hooks/useMediaQuery';
import RoundBox from '@/shared/components/round-box/RoundBox';
import { ReservationStatus } from '@/shared/types/myReservations';

export default function ReservationCard() {
  const isMobile = useMediaQuery('(max-width: 639px)');

  return (
    <RoundBox radius={isMobile ? '24' : '32'} className='relative min-h-154 shadow-card'>
      <RoundBox
        radius={isMobile ? '24' : '32'}
        className='relative z-10 w-[66%] bg-white px-16 py-20 md:px-24 md:py-28 lg:px-28 lg:py-32'>
        <ReservationStatusBadge status={ReservationStatus.Canceled} />
        <div className='mt-8 flex flex-col gap-4 md:mt-12 md:gap-6 lg:gap-8'>
          <p className='body-14 font-bold text-gray-950 md:body-16 lg:body-18'>
            함께 배우면 즐거운 스트릿 댄스
          </p>
          <p className='body-14 font-medium text-gray-500 md:body-16'>
            2023. 02. 14 · 11:00 ~ 12:30
          </p>
          <p className='flex gap-8'>
            <span className='body-16 font-bold text-gray-950 md:body-18'>₩10,000</span>
            <span className='body-14 font-normal text-gray-400 md:body-16'>10명</span>
          </p>
        </div>
      </RoundBox>
      <div className='absolute inset-y-0 right-0 w-[38%] overflow-hidden bg-primary-200'>
        <Image src='/og-default.png' alt='사진' fill className='object-cover' />
      </div>
    </RoundBox>
  );
}
