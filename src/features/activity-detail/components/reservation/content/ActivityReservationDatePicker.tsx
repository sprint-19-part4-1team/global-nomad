import { startOfDay, startOfMonth } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import '@/shared/styles/customDayPicker.css';

/**
 * 체험 예약 날짜 선택 컴포넌트의 Props
 * @property {Date | undefined} selectedDate - 선택된 날짜
 * @property {(date: Date | undefined) => void} onSelectDate - 날짜 선택 핸들러
 * @property {Date[]} availableDates - 예약 가능한 날짜 목록
 * @property {Date} currentMonth - 현재 표시 중인 월
 * @property {(month: Date) => void} onMonthChange - 월 변경 핸들러
 */
interface ActivityReservationDatePickerProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  availableDates: Date[];
  currentMonth: Date;
  onMonthChange: (month: Date) => void;
}

/**
 * 체험 예약 날짜 선택 컴포넌트
 *
 * 캘린더 UI를 제공하며, 예약 가능한 날짜만 선택할 수 있도록 제한합니다.
 *
 * @description
 * 컴포넌트는 다음과 같은 기능을 제공합니다.
 * - 한국어 로케일 지원
 * - 오늘 이전 날짜 선택 불가
 * - 예약 가능한 날짜만 활성화
 * - 2026년 1월부터 시작하는 월 선택 범위
 * - 커스텀 스타일 적용 (customDayPicker.css)
 *
 * @param {ActivityReservationDatePickerProps} props - 컴포넌트 props
 * @returns {JSX.Element} 렌더링된 날짜 선택 캘린더
 *
 * @example
 * ```tsx
 * <ActivityReservationDatePicker
 *   selectedDate={new Date('2026-01-15')}
 *   onSelectDate={(date) => setSelectedDate(date)}
 *   availableDates={[
 *     new Date('2026-01-15'),
 *     new Date('2026-01-20'),
 *     new Date('2026-01-25')
 *   ]}
 *   currentMonth={new Date('2026-01-01')}
 *   onMonthChange={(month) => setCurrentMonth(month)}
 * />
 * ```
 */
export default function ActivityReservationDatePicker({
  selectedDate,
  onSelectDate,
  availableDates,
  currentMonth,
  onMonthChange,
}: ActivityReservationDatePickerProps) {
  const today = startOfDay(new Date());

  return (
    <DayPicker
      className='custom-day-picker reservation-day-picker'
      mode='single'
      locale={ko}
      selected={selectedDate}
      onSelect={onSelectDate}
      month={currentMonth}
      onMonthChange={onMonthChange}
      disabled={(date) => {
        const checkDate = startOfDay(date);
        return (
          checkDate < today
          || !availableDates.some(
            (availableDate) => availableDate.toDateString() === checkDate.toDateString()
          )
        );
      }}
      startMonth={startOfMonth('2026/01')}
    />
  );
}
