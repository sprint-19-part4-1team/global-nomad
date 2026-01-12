import ScheduleTimeChip from '@/features/activity-form/common/components/schedule-date-section/schedule-time-chip/ScheduleTimeChip';
import ScheduleTimeEmpty from '@/features/activity-form/common/components/schedule-date-section/schedule-time-chip/ScheduleTimeEmpty';
import ScheduleTimeFieldSet from '@/features/activity-form/common/components/schedule-date-section/schedule-time-chip/ScheduleTimeFieldSet';
import { ScheduleTimeSlot } from '@/shared/types/activities';

interface ScheduleTimeSectionProps {
  /** 등록된 예약 시간대 목록 */
  times: ScheduleTimeSlot[];
  /** 특정 시간대를 제거할 때 호출되는 콜백 함수 */
  onRemoveTime: (startTime: string) => void;
}

/**
 * ## ScheduleTimeSection
 *
 * @description
 * - 예약 시간대 설정 영역 전체를 담당하는 컴포넌트입니다.
 * - 등록된 시간대 목록(`times`)의 유무에 따라
 *   빈 상태(`ScheduleTimeEmpty`) 또는
 *   시간대 목록(`ScheduleTimeChip` 리스트)을 조건부로 렌더링합니다.
 *
 * @example
 * ```tsx
 * const times = [
 *   { date: '2026-01-01', startTime: '10:00', endTime: '11:00' },
 *   { date: '2026-01-01', startTime: '14:00', endTime: '15:00' },
 * ];
 *
 * <ScheduleTimeSection
 *   times={times}
 *   onRemoveTime={(index) => removeTimeByIndex(index)}
 * />
 * ```
 */
export default function ScheduleTimeSection({ times, onRemoveTime }: ScheduleTimeSectionProps) {
  if (times.length === 0) {
    return (
      <ScheduleTimeFieldSet>
        <ScheduleTimeEmpty />
      </ScheduleTimeFieldSet>
    );
  }

  return (
    <ScheduleTimeFieldSet>
      <ul className='mt-6 flex flex-wrap gap-12 sm:mt-8'>
        {times.map(({ date, startTime, endTime }) => (
          <ScheduleTimeChip
            key={`${date}-${startTime}-${endTime}`}
            startTime={startTime}
            endTime={endTime}
            onRemove={() => onRemoveTime(startTime)}
          />
        ))}
      </ul>
    </ScheduleTimeFieldSet>
  );
}
