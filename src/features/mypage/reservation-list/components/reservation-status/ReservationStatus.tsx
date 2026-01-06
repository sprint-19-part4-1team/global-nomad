import { cva } from 'class-variance-authority';

type ReservationStatus = 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';

export const reservationStatusVariants = cva(
  'flex w-fit items-center justify-center rounded-full px-8 py-2',
  {
    variants: {
      status: {
        pending: 'bg-green-100',
        confirmed: 'bg-dark-green-100',
        declined: 'bg-red-100',
        canceled: 'bg-gray-100',
        completed: 'bg-primary-200',
      },
    },
  }
);

export const reservationStatusLabelVariants = cva('body-13 font-bold', {
  variants: {
    status: {
      pending: 'text-green-500',
      confirmed: 'text-dark-green-500',
      declined: 'text-red-400',
      canceled: 'text-gray-500',
      completed: 'text-primary-600',
    },
  },
});

export const RESERVATION_STATUS_LABEL: Record<ReservationStatus, string> = {
  pending: '예약 완료',
  confirmed: '예약 승인',
  declined: '예약 거절',
  canceled: '예약 취소',
  completed: '체험 완료',
};

interface RerservationStatusProps {
  status: ReservationStatus;
}

export default function ReservationStatus({ status }: RerservationStatusProps) {
  return (
    <div className={reservationStatusVariants({ status })}>
      <span className={reservationStatusLabelVariants({ status })}>
        {RESERVATION_STATUS_LABEL[status]}
      </span>
    </div>
  );
}
