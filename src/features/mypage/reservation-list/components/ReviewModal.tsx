'use client';

import { useRef, useState } from 'react';
import Icons from '@/assets/icons';
import { useCreateReviewMutation } from '@/features/mypage/reservation-list/mutations/useCreateReviewMutation';
import Button from '@/shared/components/button/Button';
import Backdrop from '@/shared/components/overlay/primitives/backdrop/Backdrop';
import OverlayPortal from '@/shared/components/overlay/primitives/overlay-portal/OverlayPortal';
import OverlaySurface from '@/shared/components/overlay/primitives/overlay-surface/OverlaySurface';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import Textarea from '@/shared/components/textarea/Textarea';
import type { ReservationStatus } from '@/shared/types/myReservations';
import { cn } from '@/shared/utils/cn';

interface ReviewModalProps {
  reservationId: number;
  activityId: number;
  status?: ReservationStatus;
  size?: number;
  activityTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
}

/**
 * @description
 * - 예약 완료된 체험에 대해 후기를 작성하는 모달 컴포넌트입니다.
 * - 별점(1~5)과 후기 내용을 입력받아 제출합니다.
 *
 * @param reservationId - 예약 ID
 * @param status - 예약 상태 (캐시 무효화용)
 * @param size - 페이지 사이즈 (캐시 무효화용)
 * @param activityTitle - 체험 제목
 * @param date - 예약 날짜
 * @param startTime - 체험 시작 시간
 * @param endTime - 체험 종료 시간
 * @param headCount - 예약 인원 수
 */
export default function ReviewModal({
  reservationId,
  activityId,
  status,
  size,
  activityTitle,
  date,
  startTime,
  endTime,
  headCount,
}: ReviewModalProps) {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const surfaceRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    overlayStore.pop();
  };

  const { mutate, isPending } = useCreateReviewMutation({
    activityId,
    status,
    size,
    onClose: handleClose,
  });

  const handleSubmit = () => {
    if (!content.trim() || rating === 0 || isPending) {
      return;
    }

    mutate({ reservationId, content, rating });
  };

  const handleStarClick = (score: number) => {
    setRating(score);
  };

  return (
    <OverlayPortal>
      <Backdrop />
      <OverlaySurface
        position='center'
        variant='dialog'
        ref={surfaceRef}
        className='flex flex-col gap-24 px-16 pt-16 pb-24 sm:gap-32 sm:px-24 sm:pt-24 sm:pb-36'>
        <div>
          <section className='flex flex-col gap-4'>
            <button
              type='button'
              onClick={handleClose}
              className='ml-auto flex justify-end'
              aria-label='모달 닫기'>
              <Icons.Close className='h-24 w-24 text-gray-900' />
            </button>
            <div className='flex flex-col items-center justify-center gap-4'>
              <p className='body-16 font-bold sm:body-18'>{activityTitle}</p>
              <p className='body-14 font-medium text-gray-500'>
                {date} / {startTime} - {endTime} ({headCount}명)
              </p>
            </div>
          </section>
          <section className='mt-12 flex items-center justify-center gap-12'>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
              <button
                key={star}
                type='button'
                onClick={() => handleStarClick(star)}
                aria-label={`${star}점`}>
                <Icons.Star
                  className={cn('h-42 w-42', star <= rating ? 'text-yellow-500' : 'text-gray-100')}
                />
              </button>
            ))}
          </section>
        </div>
        <Textarea
          variant='review'
          label='소중한 경험을 들려주세요'
          name='content'
          placeholder='체험에서 느낀 경험을 자유롭게 남겨주세요.'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={100}
        />
        <Button
          type='submit'
          size='lg'
          isLoading={isPending}
          disabled={!content.trim() || rating === 0}
          full
          onClick={handleSubmit}>
          작성하기
        </Button>
      </OverlaySurface>
    </OverlayPortal>
  );
}
