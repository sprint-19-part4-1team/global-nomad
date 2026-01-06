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

/**
 * @description
 * 예약 상태를 표시하는 배지 컴포넌트입니다.
 * - 상태(`status`)에 따라 배경색과 글자색이 변경됩니다.
 * - 카드 UI 등 “표시 목적”으로만 사용됩니다.
 *
 * @param status - 예약 상태 값
 */
export function ReservationStatusBadge({ status }: RerservationStatusProps) {
  return (
    <div className={cn(BADGE_CONTAINER_BASE, statusBackgroundVariants({ status }))}>
      <span className={cn(BADGE_LABEL_BASE, statusTextVariants({ status }))}>
        {RESERVATION_STATUS_LABEL[status]}
      </span>
    </div>
  );
}
