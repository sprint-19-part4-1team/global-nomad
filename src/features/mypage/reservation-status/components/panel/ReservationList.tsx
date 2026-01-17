import { useState } from 'react';
import { ReservationWithUserResponseDto } from '@/shared/types/myActivities';
import ReservationItem from './ReservationItem';

/**
 * 예약 내역 리스트 컴포넌트의 Props 타입
 *
 * @property {number} activityId - 체험 ID
 * @property {number} scheduleId - 스케줄 ID
 * @property {string} date - 예약 날짜 (yyyy-MM-dd 형식)
 * @property {ReservationWithUserResponseDto[]} reservations - 표시할 예약 목록
 */
interface ReservationListProps {
  activityId: number;
  scheduleId: number;
  date: string;
  reservations: ReservationWithUserResponseDto[];
}

/**
 * 예약 내역 리스트 컴포넌트
 *
 * 예약 목록을 순회하며 각 예약을 ReservationItem 컴포넌트로 렌더링합니다.
 * 승인 처리 중에는 모든 예약의 버튼을 비활성화하여 동시 승인을 방지합니다.
 *
 * @param {ReservationListProps} props - 컴포넌트 Props
 * @returns 예약 내역 리스트 컴포넌트
 *
 * @example
 * ```tsx
 * <ReservationList
 *   activityId={123}
 *   scheduleId={456}
 *   date="2024-01-15"
 *   reservations={[
 *     { id: 1, nickname: '테스트', headCount: 2, status: 'pending' },
 *     { id: 2, nickname: '테스트테', headCount: 3, status: 'confirmed' },
 *   ]}
 * />
 * ```
 */
export default function ReservationList({
  activityId,
  scheduleId,
  date,
  reservations,
}: ReservationListProps) {
  // 승인 처리 중인지 여부를 추적
  const [isApproving, setIsApproving] = useState(false);

  const handleApprovingChange = (id: number | null) => {
    setIsApproving(id !== null);
  };

  return (
    <div className='scrollbar-hidden flex w-full flex-col gap-14'>
      {reservations.map((reservation) => (
        <ReservationItem
          key={reservation.id}
          activityId={activityId}
          reservationId={reservation.id}
          scheduleId={scheduleId}
          date={date}
          nickname={reservation.nickname}
          headCount={reservation.headCount}
          status={reservation.status}
          allReservationsInSchedule={reservations}
          isAnyApproving={isApproving}
          onApprovingChange={handleApprovingChange}
        />
      ))}
    </div>
  );
}
