import Button from '@/shared/components/button/Button';
import { ReservationStatus } from '@/shared/types/myReservations';

interface ReservationCardActionButtonProps {
  status: ReservationStatus;
  reviewSubmitted: boolean;
  onCancel?: () => void;
  onWriteReview?: () => void;
}

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
