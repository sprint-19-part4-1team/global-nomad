import ReservationDropdownSkeleton from '@/features/mypage/reservation-status/components/skeleton/ReservationDropdownSkeleton';
import {
  SelectDropdown,
  SelectDropdownContent,
  SelectDropdownItem,
  SelectDropdownTrigger,
  SelectDropdownValue,
} from '@/shared/components/dropdown/select';
import Title from '@/shared/components/title/Title';
import { ReservedScheduleResponseDto } from '@/shared/types/myActivities';

/**
 * 예약 시간 드롭다운 컴포넌트의 Props 타입
 *
 * @property schedules - 선택 가능한 스케줄 목록
 * @property selectedScheduleId - 현재 선택된 스케줄 ID
 * @property onChangeSchedule - 스케줄 변경 핸들러
 * @property isPending - 스케줄 로딩 상태
 */
interface ReservationTimeDropdownProps {
  schedules: ReservedScheduleResponseDto[];
  selectedScheduleId: string;
  onChangeSchedule: (scheduleId: string) => void;
  isPending: boolean;
}

/**
 * 예약 시간 선택 드롭다운 컴포넌트
 *
 * 활동의 스케줄 목록을 드롭다운으로 표시하고,
 * 사용자가 특정 시간대를 선택할 수 있도록 합니다.
 * 로딩 중에는 스켈레톤 UI를 표시합니다.
 *
 * @param props - 컴포넌트 Props
 * @returns 예약 시간 선택 드롭다운 컴포넌트
 *
 * @example
 * ```tsx
 * <ReservationTimeDropdown
 *   schedules={[
 *     { scheduleId: 1, startTime: '09:00', endTime: '11:00' },
 *     { scheduleId: 2, startTime: '14:00', endTime: '16:00' }
 *   ]}
 *   selectedScheduleId="1"
 *   onChangeSchedule={(id) => setSelectedScheduleId(id)}
 *   isPending={false}
 * />
 * ```
 */
export default function ReservationTimeDropdown({
  schedules,
  selectedScheduleId,
  onChangeSchedule,
  isPending,
}: ReservationTimeDropdownProps) {
  return (
    <div className='flex flex-col gap-12'>
      <Title as='h4' responsive='sm'>
        예약 시간
      </Title>
      {isPending ? (
        <ReservationDropdownSkeleton />
      ) : (
        <SelectDropdown
          onChangeValue={onChangeSchedule}
          triggerId='activity-select'
          value={selectedScheduleId}>
          <SelectDropdownTrigger>
            <SelectDropdownValue
              placeholder='시간 선택'
              render={(value) => {
                const schedule = schedules.find((s) => s.scheduleId.toString() === value);
                return schedule ? `${schedule.startTime} - ${schedule.endTime}` : '';
              }}
            />
          </SelectDropdownTrigger>

          <SelectDropdownContent>
            {schedules.map((schedule) => (
              <SelectDropdownItem key={schedule.scheduleId} value={schedule.scheduleId.toString()}>
                {schedule.startTime} - {schedule.endTime}
              </SelectDropdownItem>
            ))}
          </SelectDropdownContent>
        </SelectDropdown>
      )}
    </div>
  );
}
