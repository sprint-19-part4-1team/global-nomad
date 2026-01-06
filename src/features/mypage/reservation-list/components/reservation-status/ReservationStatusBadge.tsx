import {
  RESERVATION_STATUS_LABEL,
  ReservationStatusType,
  statusBackgroundVariants,
  statusTextVariants,
} from '@/features/mypage/reservation-list/constants/common';
import { cn } from '@/shared/utils/cn';

const BADGE_CONTAINER_BASE = 'flex w-fit items-center justify-center rounded-full px-8 py-2';

const BADGE_LABEL_BASE = 'body-13 font-bold';

interface RerservationStatusProps {
  status: ReservationStatusType;
}

export function ReservationStatusBadge({ status }: RerservationStatusProps) {
  return (
    <div className={cn(BADGE_CONTAINER_BASE, statusBackgroundVariants({ status }))}>
      <span className={cn(BADGE_LABEL_BASE, statusTextVariants({ status }))}>
        {RESERVATION_STATUS_LABEL[status]}
      </span>
    </div>
  );
}
