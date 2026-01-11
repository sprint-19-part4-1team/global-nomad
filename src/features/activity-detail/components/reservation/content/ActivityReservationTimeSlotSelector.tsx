import Button from '@/shared/components/button/Button';
import { ScheduleTimeType } from '@/shared/types/activities';

/**
 * 체험 예약 시간대 선택 컴포넌트의 Props
 * @property {Date | undefined} selectedDate - 선택된 날짜
 * @property {ScheduleTimeType[]} availableTimes - 예약 가능한 시간대 목록
 * @property {number | null} selectedScheduleId - 선택된 스케줄 ID
 * @property {(scheduleId: number) => void} onSelectSchedule - 스케줄 선택 핸들러
 */
interface ActivityReservationTimeSlotSelectorProps {
  selectedDate: Date | undefined;
  availableTimes: ScheduleTimeType[];
  selectedScheduleId: number | null;
  onSelectSchedule: (scheduleId: number) => void;
}

/**
 * 체험 예약 시간대 선택 컴포넌트
 *
 * 선택된 날짜에 예약 가능한 시간대를 버튼 형태로 표시하며,
 * 사용자가 원하는 시간대를 선택할 수 있도록 합니다.
 *
 * @description
 * 컴포넌트는 다음과 같은 상태를 처리합니다:
 * - 날짜 미선택: "날짜를 선택해주세요." 메시지 표시
 * - 예약 가능 시간 없음: "예약 가능한 시간이 없습니다." 메시지 표시
 * - 예약 가능 시간 존재: 시간대 목록을 버튼으로 표시
 * - 선택된 시간대: primary 색상으로 강조 표시
 *
 * @param {ActivityReservationTimeSlotSelectorProps} props - 컴포넌트 props
 * @returns {JSX.Element} 렌더링된 시간대 선택 UI
 *
 * @example
 * ```tsx
 * <ActivityReservationTimeSlotSelector
 *   selectedDate={new Date('2024-01-15')}
 *   availableTimes={[
 *     { id: 1, startTime: '10:00', endTime: '12:00' },
 *     { id: 2, startTime: '14:00', endTime: '16:00' }
 *   ]}
 *   selectedScheduleId={1}
 *   onSelectSchedule={(scheduleId) => console.log(scheduleId)}
 * />
 * ```
 */
export default function ActivityReservationTimeSlotSelector({
  selectedDate,
  availableTimes,
  selectedScheduleId,
  onSelectSchedule,
}: ActivityReservationTimeSlotSelectorProps) {
  if (!selectedDate) {
    return (
      <div className='mx-auto mb-10 body-16 font-medium tracking-[-0.4px] text-gray-400'>
        날짜를 선택해주세요.
      </div>
    );
  }

  if (availableTimes.length === 0) {
    return (
      <div className='mx-auto mb-10 body-16 font-medium tracking-[-0.4px] text-gray-400'>
        예약 가능한 시간이 없습니다.
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-12'>
      {availableTimes.map((time) => (
        <Button
          key={time.id}
          full
          variant='secondary'
          onClick={() => onSelectSchedule(time.id)}
          className={
            selectedScheduleId === time.id
              ? 'border-2 border-primary-500 bg-primary-100 text-primary-500'
              : ''
          }>
          {time.startTime} - {time.endTime}
        </Button>
      ))}
    </div>
  );
}
