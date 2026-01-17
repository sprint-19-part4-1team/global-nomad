'use client';

import { ReservationStatusBadge } from '@/features/mypage/common/components/reservation-status-badge/ReservationStatusBadge';
import ReservationCardActionButton from '@/features/mypage/reservation-list/components/reservation-card/ReservationCardActionButton';
import ReservationCardImage from '@/features/mypage/reservation-list/components/reservation-card/ReservationCardImage';
import { useFormattedSchedule } from '@/features/mypage/reservation-list/hooks/useFormattedSchedule';
import RoundBox from '@/shared/components/round-box/RoundBox';
import { ReservationWithActivityResponseDto } from '@/shared/types/myReservations';
import { formatValue } from '@/shared/utils/formatValue';

interface ReservationCardProps {
  reservation: ReservationWithActivityResponseDto;
  onCancel?: () => void;
  onWriteReview?: () => void;
}

/**
 * @description
 * - 마이페이지 예약 목록에서 사용되는 예약 카드 컴포넌트입니다.
 * - 예약 상태, 일정, 가격, 인원 정보를 표시합니다.
 * - 예약 상태에 따라 액션 버튼과 이미지 오버레이 UI가 달라집니다.
 *
 * @param reservation - 예약 정보 객체
 * @param onCancel - 예약 취소 버튼 클릭 시 실행할 핸들러
 * @param onWriteReview - 후기 작성 버튼 클릭 시 실행할 핸들러
 */
export default function ReservationCard({
  reservation,
  onCancel,
  onWriteReview,
}: ReservationCardProps) {
  const { activity, status, date, startTime, endTime, totalPrice, headCount, reviewSubmitted } =
    reservation;
  const schedule = useFormattedSchedule(date, startTime, endTime);

  return (
    <RoundBox radius='24' className='relative min-h-154 shadow-card sm:rounded-32'>
      <RoundBox
        radius='24'
        className='relative z-5 flex w-[66%] flex-col gap-12 bg-white px-16 py-20 sm:rounded-32 md:px-24 md:py-28 lg:px-28 lg:py-32'>
        <ReservationStatusBadge status={status} />
        <div className='flex flex-col gap-4 md:gap-6 lg:gap-8'>
          <p className='body-14 font-bold text-gray-950 md:body-16 lg:body-18'>{activity.title}</p>
          <p className='body-14 font-medium text-gray-500 md:body-16'>{schedule}</p>
          <p className='flex gap-8'>
            <span className='body-16 font-bold text-gray-950 md:body-18'>
              ₩{formatValue(totalPrice)}
            </span>
            <span className='body-14 font-normal text-gray-400 md:body-16'>{headCount}명</span>
          </p>
        </div>
        <ReservationCardActionButton
          status={status}
          activityId={activity.id}
          reviewSubmitted={reviewSubmitted}
          onCancel={onCancel}
          onWriteReview={onWriteReview}
        />
      </RoundBox>
      <ReservationCardImage
        activityId={activity.id}
        imageUrl={activity.bannerImageUrl}
        status={status}
        reviewSubmitted={reviewSubmitted}
      />
    </RoundBox>
  );
}
