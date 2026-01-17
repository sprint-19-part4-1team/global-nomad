'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { getActivityDetail } from '@/shared/apis/feature/activities';
import Button from '@/shared/components/button/Button';
import { ReservationStatus } from '@/shared/types/myReservations';

interface ReservationCardActionButtonProps {
  status: ReservationStatus;
  activityId: number;
  reviewSubmitted: boolean;
  onCancel?: () => void;
  onWriteReview?: () => void;
}

/**
 * @description
 * - 예약 상태에 따라 카드 하단에 노출될 액션 버튼을 결정하는 컴포넌트입니다.
 * - `Pending` 상태에서는 '예약 취소' 버튼을,
 * - `Completed` 상태이며 후기를 작성하지 않은 경우 '후기 작성' 버튼을 표시합니다.
 * - 후기 작성 버튼 클릭 시 체험 존재 여부를 확인합니다.
 *
 * @param status - 예약 상태
 * @param activityId - 체험 ID (존재 여부 확인에 사용)
 * @param reviewSubmitted - 후기 작성 완료 여부
 * @param onCancel - 예약 취소 버튼 클릭 시 실행할 핸들러
 * @param onWriteReview - 후기 작성 버튼 클릭 시 실행할 핸들러
 */
export default function ReservationCardActionButton({
  status,
  activityId,
  reviewSubmitted,
  onCancel,
  onWriteReview,
}: ReservationCardActionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleWriteReview = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      await getActivityDetail(activityId);
      onWriteReview?.();
    } catch {
      toast.error('존재하지 않는 체험입니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === ReservationStatus.Pending) {
    return (
      <Button size='sm' onClick={onCancel} variant='negative'>
        예약 취소
      </Button>
    );
  }

  if (status === ReservationStatus.Completed && !reviewSubmitted) {
    return (
      <Button size='sm' onClick={handleWriteReview} variant='primary' disabled={isLoading}>
        후기 작성
      </Button>
    );
  }

  return null;
}
