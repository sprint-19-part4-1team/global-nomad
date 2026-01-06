import {
  RESERVATION_STATUS_LABEL,
  ReservationStatusType,
  statusBackgroundVariants,
  statusTextVariants,
} from '@/features/mypage/reservation-list/constants/common';
import { cn } from '@/shared/utils/cn';

interface ReservationFilterButtonProps {
  status: ReservationStatusType;
  isActive: boolean;
  onSelect: (status: ReservationStatusType) => void;
}

const BUTTON_BASE =
  'w-fit cursor-pointer rounded-full border border-gray-200 bg-white px-16 py-6 sm:py-8 whitespace-nowrap';
const LABEL_BASE = 'body-14 font-semibold whitespace-nowrap text-gray-950 sm:body-16';

export default function ReservationFilterButton({
  status,
  isActive,
  onSelect,
}: ReservationFilterButtonProps) {
  const SELECTED_BUTTON = cn('border-transparent', statusBackgroundVariants({ status }));
  const SELECTED_LABEL = statusTextVariants({ status });

  return (
    <button
      type='button'
      aria-pressed={isActive}
      onClick={() => onSelect(status)}
      className={cn(BUTTON_BASE, isActive ? SELECTED_BUTTON : '')}>
      <span className={cn(LABEL_BASE, isActive ? SELECTED_LABEL : '')}>
        {RESERVATION_STATUS_LABEL[status]}
      </span>
    </button>
  );
}
