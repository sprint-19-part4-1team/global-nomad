import Button from '@/shared/components/button/Button';
import { ReservationStatus } from '@/shared/types/myReservations';

interface ReservationCardActionButtonProps {
  status: ReservationStatus;
  reviewSubmitted: boolean;
  onCancel?: () => void;
  onWriteReview?: () => void;
}

/**
 * @description
 * - 예약 상태에 따라 카드 하단에 노출될 액션 버튼을 결정하는 컴포넌트입니다.
 * - `Pending` 상태에서는 '예약 취소' 버튼을,
 * - `Completed` 상태이며 후기를 작성하지 않은 경우 '후기 작성' 버튼을 표시합니다.
 *
 * @param status - 예약 상태
 * @param reviewSubmitted - 후기 작성 완료 여부
 * @param onCancel - 예약 취소 버튼 클릭 시 실행할 핸들러
 * @param onWriteReview - 후기 작성 버튼 클릭 시 실행할 핸들러
 */
export default function ReservationCardActionButton({
  status,
  reviewSubmitted,
  onCancel,
  onWriteReview,
}: ReservationCardActionButtonProps) {
  if (status === ReservationStatus.Pending) {
    return (
      <Button size='sm' onClick={onCancel} variant='negative'>
        예약 취소
      </Button>
    );
  }

  if (status === ReservationStatus.Completed && !reviewSubmitted) {
    return (
      <Button size='sm' onClick={onWriteReview} variant='primary'>
        후기 작성
      </Button>
    );
  }

  return null;
}
