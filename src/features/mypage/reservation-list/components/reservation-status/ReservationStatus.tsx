type ReservationStatus = 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';

const RESERVATION_STATUS_STYLE: Record<
  ReservationStatus,
  {
    label: string;
    containerColor: string;
    labelColor: string;
  }
> = {
  pending: { label: '예약 완료', containerColor: 'bg-green-100', labelColor: 'text-green-500' },
  confirmed: {
    label: '예약 승인',
    containerColor: 'bg-dark-green-100',
    labelColor: 'text-dark-green-500',
  },
  declined: { label: '예약 거절', containerColor: 'bg-red-100', labelColor: 'text-red-400' },
  canceled: { label: '예약 취소', containerColor: 'bg-gray-100', labelColor: 'text-gray-500' },
  completed: {
    label: '체험 완료',
    containerColor: 'bg-primary-200',
    labelColor: 'text-primary-600',
  },
};

interface RerservationStatusProps {
  status: ReservationStatus;
}

export default function ReservationStatus({ status }: RerservationStatusProps) {
  const { label, containerColor, labelColor } = RESERVATION_STATUS_STYLE[status];

  return (
    <div
      className={`flex w-fit items-center justify-center rounded-full px-8 py-2 ${containerColor}`}>
      <span className={`text-gray950 body-13 font-bold ${labelColor}`}>{label}</span>
    </div>
  );
}
