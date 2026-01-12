import { startOfDay } from 'date-fns';
import ActivityReservationContentTitle from '@/features/activity-detail/components/reservation/content/ActivityReservationContentTitle';
import ActivityReservationDatePicker from '@/features/activity-detail/components/reservation/content/ActivityReservationDatePicker';
import ActivityReservationTimeSlotSelector from '@/features/activity-detail/components/reservation/content/ActivityReservationTimeSlotSelector';
import {
  getAvailableDates,
  getSchedulesByDate,
} from '@/features/activity-detail/utils/reservationDateUtils';
import { ScheduleResponseDto } from '@/shared/types/activities';
import { formatDateToString } from '@/shared/utils/dateUtil';

/**
 * 체험 예약 날짜/시간 선택 섹션 컴포넌트의 Props
 * @property {Date | undefined} selectedDate - 선택된 날짜
 * @property {(date: Date | undefined) => void} onDateSelect - 날짜 선택 핸들러
 * @property {number | null} selectedScheduleId - 선택된 스케줄 ID
 * @property {(id: number) => void} onScheduleSelect - 스케줄 선택 핸들러
 * @property {ScheduleResponseDto[]} schedules - 예약 가능한 스케줄 목록
 * @property {Date} currentMonth - 현재 표시 중인 월
 * @property {(month: Date) => void} onMonthChange - 월 변경 핸들러
 * @property {boolean} [isBottomSheet] - 바텀시트 모드 여부 (기본값: false)
 */
interface ActivityReservationDateTimeSectionProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  selectedScheduleId: number | null;
  onScheduleSelect: (id: number) => void;
  schedules: ScheduleResponseDto[];
  currentMonth: Date;
  onMonthChange: (month: Date) => void;
  isBottomSheet?: boolean;
}

/**
 * 체험 예약 날짜/시간 선택 섹션 컴포넌트
 *
 * 예약 가능한 날짜를 달력으로 표시하고,
 * 선택한 날짜의 예약 가능한 시간대를 표시합니다.
 *
 * @description
 * 컴포넌트는 다음과 같은 기능을 제공합니다:
 * - 날짜 선택: 예약 가능한 날짜만 활성화된 달력 표시
 * - 시간대 선택: 선택된 날짜의 예약 가능한 시간대 목록 표시
 * - 반응형 레이아웃: 화면 크기에 따라 세로/가로 배치 전환
 * - 바텀시트 모드: isBottomSheet가 true일 경우 날짜 타이틀 숨김
 * - 스크롤 영역: 모바일에서 최대 높이 530px로 제한하여 스크롤 가능
 *
 * @param {ActivityReservationDateTimeSectionProps} props - 컴포넌트 props
 * @returns {JSX.Element} 렌더링된 날짜/시간 선택 섹션
 *
 * @example
 * ```tsx
 * <ActivityReservationDateTimeSection
 *   selectedDate={new Date('2026-01-15')}
 *   onDateSelect={(date) => setSelectedDate(date)}
 *   selectedScheduleId={1}
 *   onScheduleSelect={(id) => setSelectedScheduleId(id)}
 *   schedules={[
 *     {
 *       id: 1,
 *       date: '2026-01-15',
 *       startTime: '10:00',
 *       endTime: '12:00',
 *       count: 5
 *     }
 *   ]}
 *   currentMonth={new Date('2026-01-01')}
 *   onMonthChange={(month) => setCurrentMonth(month)}
 *   isBottomSheet={false}
 * />
 * ```
 */
export default function ActivityReservationDateTimeSection({
  selectedDate,
  onDateSelect,
  selectedScheduleId,
  onScheduleSelect,
  schedules,
  currentMonth,
  onMonthChange,
  isBottomSheet = false,
}: ActivityReservationDateTimeSectionProps) {
  const today = startOfDay(new Date());
  const availableDates = getAvailableDates(schedules, today);

  // 선택된 날짜의 시간 목록
  const availableTimes = selectedDate
    ? getSchedulesByDate(schedules)[formatDateToString(selectedDate)] || []
    : [];

  return (
    <div className='scrollbar-hidden flex max-h-530 flex-col gap-24 overflow-y-auto sm:max-h-none sm:flex-row sm:overflow-y-visible lg:flex-col'>
      {/* 날짜 선택 */}
      <div className='mx-auto flex flex-col gap-8 sm:flex-1'>
        {!isBottomSheet && <ActivityReservationContentTitle>날짜</ActivityReservationContentTitle>}
        <ActivityReservationDatePicker
          selectedDate={selectedDate}
          onSelectDate={onDateSelect}
          availableDates={availableDates}
          currentMonth={currentMonth}
          onMonthChange={onMonthChange}
        />
      </div>

      {/* 시간 선택 영역 */}
      <div className='flex flex-col gap-14 sm:flex-1'>
        <ActivityReservationContentTitle>예약 가능한 시간</ActivityReservationContentTitle>
        <ActivityReservationTimeSlotSelector
          selectedDate={selectedDate}
          availableTimes={availableTimes}
          selectedScheduleId={selectedScheduleId}
          onSelectSchedule={onScheduleSelect}
        />
      </div>
    </div>
  );
}
