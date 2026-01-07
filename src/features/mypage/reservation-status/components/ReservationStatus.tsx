import {
  CALENDAR_STYLE,
  RESERVATION_STATUS_CONFIG,
} from '@/features/mypage/reservation-status/constants/reservationStatus';
import { FindReservationsByMonthResponseDto } from '@/shared/types/myActivities';
import { ReservationStatus as ReservationStatusEnum } from '@/shared/types/myReservations';

/**
 * ReservationStatus 컴포넌트의 Props
 *
 * @property {FindReservationsByMonthResponseDto} reservation - 날짜별 예약 상태 및 건수를 포함한 예약 데이터
 */
interface ReservationStatusProps {
  reservation: FindReservationsByMonthResponseDto;
}

/**
 * 예약 상태별 건수를 표시하는 컴포넌트
 *
 * @description
 * 완료, 대기, 확정 등의 예약 상태를 순회하며
 * 각 상태에 해당하는 예약 건수가 존재할 경우에만 UI를 렌더링
 *
 * @example
 * ```tsx
 * <ReservationStatus
 *   reservation={{
 *     date: '2026-01-05',
 *     reservations: { completed: 1, confirmed: 2, pending: 1 }
 *   }}
 * />
 * ```
 *
 * @param props - ReservationStatus 컴포넌트의 props
 * @returns 렌더링된 예약 상태 뱃지 목록
 */
export default function ReservationStatus({ reservation }: ReservationStatusProps) {
  // 화면에 표시할 예약 상태 타입 목록
  const statusTypes = [
    ReservationStatusEnum.Completed,
    ReservationStatusEnum.Pending,
    ReservationStatusEnum.Confirmed,
  ] as const;

  return (
    <div className='flex flex-col gap-6 sm:gap-5'>
      {statusTypes.map((statusType) => {
        const count = reservation.reservations[statusType];

        // 해당 상태의 예약 건수가 없는 경우 렌더링하지 않음
        if (count <= 0) {
          return null;
        }

        const config = RESERVATION_STATUS_CONFIG[statusType];

        return (
          <div key={statusType} className={`${CALENDAR_STYLE.STATUS} ${config.style}`}>
            <span>{config.label}</span>
            <span>{count}</span>
          </div>
        );
      })}
    </div>
  );
}
