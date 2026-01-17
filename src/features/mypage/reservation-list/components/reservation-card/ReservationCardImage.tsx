'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Icons from '@/assets/icons';
import { getActivityDetail } from '@/shared/apis/feature/activities';
import { ReservationStatus } from '@/shared/types/myReservations';

interface ReservationCardImageProps {
  activityId: number;
  imageUrl: string;
  status: ReservationStatus;
  reviewSubmitted: boolean;
}

/**
 * @description
 * - 예약 카드 우측에 노출되는 이미지 영역 컴포넌트입니다.
 * - 체험 완료 + 후기 작성 완료 상태일 경우,
 *   이미지 위에 어두운 오버레이와 완료 아이콘을 표시합니다.
 * - 이미지 클릭 시 체험 존재 여부를 확인하고 상세 페이지로 이동합니다.
 *
 * @param activityId - 체험 ID (상세 페이지 링크에 사용)
 * @param imageUrl - 체험 썸네일 이미지 URL
 * @param status - 예약 상태
 * @param reviewSubmitted - 후기 작성 완료 여부
 */
export default function ReservationCardImage({
  activityId,
  imageUrl,
  status,
  reviewSubmitted,
}: ReservationCardImageProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const isReviewCompleted = status === ReservationStatus.Completed && reviewSubmitted;

  const handleClick = async () => {
    if (isNavigating) {
      return;
    }

    setIsNavigating(true);
    try {
      await getActivityDetail(activityId);
      router.push(`/activity/${activityId}`);
    } catch {
      toast.error('존재하지 않는 체험입니다.');
    } finally {
      setIsNavigating(false);
    }
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={isNavigating}
      aria-label='체험 상세 페이지로 이동'
      className='absolute inset-y-0 right-0 w-[40%] cursor-pointer overflow-hidden bg-primary-200'>
      <div className='relative h-full w-full'>
        <Image src={imageUrl} alt='썸네일 이미지' fill sizes='40vw' className='object-cover' />

        {isReviewCompleted && (
          <>
            <div className='absolute inset-0 bg-black/30' />
            <div className='absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2'>
              <Icons.CompleteEarth className='h-90 w-90' />
            </div>
          </>
        )}
      </div>
    </button>
  );
}
