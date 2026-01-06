import ReservationStatus from '@/features/mypage/reservation-list/components/reservation-status/ReservationStatus';

export default function ReservationStatusFilterButton() {
  return (
    <button>
      <ReservationStatus status='pending' />
    </button>
  );
}
