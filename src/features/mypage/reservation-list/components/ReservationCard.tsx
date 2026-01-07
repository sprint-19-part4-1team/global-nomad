'use client';

import Image from 'next/image';
import { ReservationStatusBadge } from '@/features/mypage/reservation-list/components/ReservationStatusBadge';
import { useFormattedSchedule } from '@/features/mypage/reservation-list/hooks/useFormattedSchedule';
import { useMediaQuery } from '@/features/mypage/reservation-list/hooks/useMediaQuery';
import Button from '@/shared/components/button/Button';
import RoundBox from '@/shared/components/round-box/RoundBox';
import { ReservationStatus } from '@/shared/types/myReservations';

interface ReservationCardProps {
  status: ReservationStatus;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  headCount: number;
  imageUrl: string;
  reviewSubmitted: boolean;
}

export default function ReservationCard({
  status,
  title,
  date,
  startTime,
  endTime,
  totalPrice,
  headCount,
  imageUrl,
  reviewSubmitted,
}: ReservationCardProps) {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const schedule = useFormattedSchedule(date, startTime, endTime);

  return (
    <RoundBox radius={isMobile ? '24' : '32'} className='relative min-h-154 shadow-card'>
      <RoundBox
        radius={isMobile ? '24' : '32'}
        className='relative z-5 flex w-[66%] flex-col gap-12 bg-white px-16 py-20 md:px-24 md:py-28 lg:px-28 lg:py-32'>
        <ReservationStatusBadge status={status} />
        <div className='flex flex-col gap-4 md:gap-6 lg:gap-8'>
          <p className='body-14 font-bold text-gray-950 md:body-16 lg:body-18'>{title}</p>
          <p className='body-14 font-medium text-gray-500 md:body-16'>{schedule}</p>
          <p className='flex gap-8'>
            <span className='body-16 font-bold text-gray-950 md:body-18'>
              ₩{totalPrice.toLocaleString('ko-KR')}
            </span>
            <span className='body-14 font-normal text-gray-400 md:body-16'>{headCount}명</span>
          </p>
        </div>
        {status === ReservationStatus.Pending && (
          <Button size='sm' onClick={() => {}} variant='negative'>
            예약 취소
          </Button>
        )}
        {status === ReservationStatus.Completed && !reviewSubmitted && (
          <Button size='sm' onClick={() => {}} variant='primary'>
            후기 작성
          </Button>
        )}
      </RoundBox>
      <div className='absolute inset-y-0 right-0 w-[38%] overflow-hidden bg-primary-200'>
        <Image src={imageUrl} alt='썸네일 이미지' fill className='object-cover' />
      </div>
    </RoundBox>
  );
}
