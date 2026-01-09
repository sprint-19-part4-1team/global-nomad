import { DayPicker } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import './styles/customDayPicker.css';
import { getScheduleDateRange } from '@/features/activity-form/common/components/schedule-date-section/schedule-date-input/utils/getScheduleDateRange';

const DEFAULT_SCHEDULE_RANGE_DAYS = 60;

interface ScheduleDatePickerProps {
  /** 선택된 날짜 */
  value?: Date;
  /** 날짜 선택 시 호출되는 핸들러 */
  onChange: (date: Date | undefined) => void;
}

/**
 * ## ScheduleDatePicker
 *
 * @description
 * - 일정 선택을 위한 캘린더(DatePicker) 컴포넌트입니다.
 * - 오늘 이전 날짜는 선택할 수 없으며,
 *   오늘 기준 `DEFAULT_SCHEDULE_RANGE_DAYS`일 이후까지 선택 가능합니다.
 * - 달 네비게이션은 현재 달부터 최대 2개월 이후까지만 허용됩니다.
 *
 * @example
 * ```tsx
 * <ScheduleDatePicker />
 * ```
 */
export default function ScheduleDatePicker({ value, onChange }: ScheduleDatePickerProps) {
  const { minDate, maxDate, startMonth, endMonth } = getScheduleDateRange(
    DEFAULT_SCHEDULE_RANGE_DAYS
  );

  return (
    <DayPicker
      className='custom-day-picker min-h-348 w-fit rounded-16 p-16 font-sans text-gray-950 shadow-card sm:p-24'
      mode='single'
      locale={ko}
      selected={value}
      onSelect={onChange}
      disabled={{ before: minDate, after: maxDate }}
      startMonth={startMonth}
      endMonth={endMonth}
    />
  );
}
