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

/**
 * 버튼, 라벨 공통 스타일
 */
const BUTTON_BASE =
  'w-fit cursor-pointer rounded-full border border-gray-200 bg-white px-16 py-6 sm:py-8 whitespace-nowrap';
const LABEL_BASE = 'body-14 font-semibold whitespace-nowrap text-gray-950 sm:body-16';

/**
 * @description
 * 예약 상태를 선택하기 위한 필터 버튼 컴포넌트입니다.
 * - 선택 여부(`isActive`)에 따라 스타일이 변경됩니다.
 *
 * @param status - 버튼이 나타내는 예약 상태
 * @param isActive - 현재 선택된 상태인지 여부
 * @param onSelect - 상태 선택 시 호출되는 콜백
 */
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
