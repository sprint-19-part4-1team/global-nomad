import { TabsList, TabsTrigger } from '@/shared/components/tabs';
import { ReservationStatus } from '@/shared/types/myReservations';

/**
 * 스케줄별 예약 카운트 타입
 *
 * @property pending - 신청 상태 예약 내역 수
 * @property confirmed - 승인 상태 예약 내역 수
 * @property declined - 거절 상태 예약 내역 수
 */
interface ScheduleCount {
  pending: number;
  confirmed: number;
  declined: number;
}

/**
 * 예약 탭 버튼 컴포넌트의 Props 타입
 *
 * @property [scheduleCount] - 각 탭의 예약 내역 수
 */
interface ReservationTabButtonsProps {
  scheduleCount?: ScheduleCount;
}

/**
 * 예약 상태별 탭 버튼 컴포넌트
 *
 * 신청/승인/거절 상태의 탭 버튼을 렌더링하고,
 * 각 상태별 예약 내역 수를 함께 표시합니다.
 *
 * @param props - 컴포넌트 Props
 * @returns 예약 상태별 탭 버튼 컴포넌트
 *
 * @example
 * ```tsx
 * <ReservationTabButtons
 *   scheduleCount={{ pending: 5, confirmed: 10, declined: 2 }}
 * />
 * ```
 */
export default function ReservationTabButtons({ scheduleCount }: ReservationTabButtonsProps) {
  return (
    <TabsList>
      <TabsTrigger value={ReservationStatus.Pending}>
        <span>신청</span>
        <span className='pl-4'>{scheduleCount?.pending}</span>
      </TabsTrigger>
      <TabsTrigger value={ReservationStatus.Confirmed}>
        <span>승인</span>
        <span className='pl-4'>{scheduleCount?.confirmed}</span>
      </TabsTrigger>
      <TabsTrigger value={ReservationStatus.Declined}>
        <span>거절</span>
        <span className='pl-4'>{scheduleCount?.declined}</span>
      </TabsTrigger>
    </TabsList>
  );
}
