'use client';

import { format, addMonths, subMonths, isSameMonth, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import Icons from '@/assets/icons';
import ReservationBadge from '@/features/mypage/reservation-status/components/ReservationBadge';
import {
  CALENDAR_STYLE,
  WEEK_DAYS,
} from '@/features/mypage/reservation-status/constants/reservationStatus';
import { useReservationCalendar } from '@/features/mypage/reservation-status/hooks/useReservationCalendar';
import Title from '@/shared/components/title/Title';
import { FindReservationsByMonthResponseDto } from '@/shared/types/myActivities';
import { cn } from '@/shared/utils/cn';

/**
 * ReservationCalendar 컴포넌트의 Props
 *
 * @property {readonly FindReservationsByMonthResponseDto[]} reservations - 표시할 예약 데이터 배열
 * @property {Date} currentMonth - 현재 표시 중인 월
 * @property {(newMonth: Date) => void} onMonthChange - 월 변경 시 호출되는 콜백 함수
 */
interface ReservationCalendarProps {
  reservations: readonly FindReservationsByMonthResponseDto[];
  currentMonth: Date;
  onMonthChange: (newMonth: Date) => void;
}

/**
 * 체험 예약 현황을 표시하는 월간 달력 컴포넌트
 *
 * @description
 * - 월 단위로 예약 현황을 시각적으로 표시
 * - 각 날짜별로 완료/승인/예약 건수 표시
 * - 이전/다음 달 네비게이션 지원 (2026년 1월 ~ 현재 달 +4개월)
 * - 예약이 있는 날짜는 클릭 가능 (hover 효과)
 * - 오늘 날짜는 연두색 배경으로 표시
 *
 * @example
 * ```tsx
 * const reservations = [
 *   {
 *     date: '2026-01-05',
 *     reservations: { completed: 1, confirmed: 2, pending: 1 }
 *   }
 * ];
 *
 * <ReservationCalendar
 *   reservations={reservations}
 *   currentMonth={new Date()}
 *   onMonthChange={(newMonth) => setCurrentMonth(newMonth)}
 * />
 * ```
 *
 * @param props - ReservationCalendar 컴포넌트 props
 * @returns 렌더링된 달력 컴포넌트
 */
export default function ReservationCalendar({
  reservations,
  currentMonth,
  onMonthChange,
}: ReservationCalendarProps) {
  const { today, canGoPrevMonth, canGoNextMonth, calendarDays, getReservationForDateMemo } =
    useReservationCalendar({
      reservations,
      currentMonth,
    });

  /**
   * 날짜 클릭 핸들러
   *
   * @description
   * 예약이 있는 날짜를 클릭했을 때 해당 날짜 정보를 콘솔에 출력
   * 추후 API 연동 및 모달 표시 로직이 추가될 예정
   *
   * @param date - 클릭된 날짜
   */
  const handleDateClick = (date: Date) => {
    // TODO: 예약 정보 API 호출 및 모달 표시
    const dateStr = format(date, 'yyyy-MM-dd');
    console.log(dateStr);
  };

  return (
    <div className='-mx-24 flex w-screen flex-col gap-8 bg-white sm:mx-auto sm:w-full sm:gap-30 sm:rounded-24 sm:pt-20 sm:pb-10 sm:shadow-card'>
      {/* 헤더 */}
      <div className='flex items-center justify-center gap-8 sm:gap-30'>
        <button
          onClick={() => canGoPrevMonth && onMonthChange(subMonths(currentMonth, 1))}
          className={CALENDAR_STYLE.MONTH_BTN}
          aria-label='이전 달'
          disabled={!canGoPrevMonth}>
          <Icons.CaretLeft
            aria-hidden='true'
            className={`w-full ${canGoPrevMonth ? 'text-gray-950' : 'text-gray-300'}`}
          />
        </button>
        <Title as='h3' responsive='md' className='text-gray-950'>
          {format(currentMonth, 'yyyy년 M월', { locale: ko })}
        </Title>
        <button
          onClick={() => canGoNextMonth && onMonthChange(addMonths(currentMonth, 1))}
          className={CALENDAR_STYLE.MONTH_BTN}
          aria-label='다음 달'
          disabled={!canGoNextMonth}>
          <Icons.CaretRight
            aria-hidden='true'
            className={`w-full ${canGoNextMonth ? 'text-gray-950' : 'text-gray-300'}`}
          />
        </button>
      </div>

      <div role='grid' aria-label='예약 현황 표시 달력' className='flex flex-col gap-4 sm:gap-12'>
        {/* 요일 헤더 */}
        <div role='row' className='grid grid-cols-7'>
          {WEEK_DAYS.map((day, idx) => (
            <div
              key={idx}
              role='columnheader'
              className='p-12 text-center body-13 font-bold text-gray-900 sm:body-16'>
              {day}
            </div>
          ))}
        </div>

        <div role='row' className='grid grid-cols-7'>
          {calendarDays.map((day, index) => {
            const reservation = getReservationForDateMemo(day);
            const isCurrentMonthDay = isSameMonth(day, currentMonth);
            const isToday = isSameDay(day, today);
            const hasReservation = reservation && isCurrentMonthDay;

            return (
              <div
                key={index}
                role='gridcell'
                aria-label={format(day, 'yyyy년 M월 d일', { locale: ko })}
                onClick={() => hasReservation && handleDateClick(day)}
                className={cn(
                  'flex h-104 flex-col items-center gap-6 border-t px-4 pt-10 pb-6 sm:h-124 sm:gap-5 sm:px-12 sm:pt-18 sm:pb-10',
                  index < 7 ? 'border-gray-100' : 'border-gray-50',
                  { 'bg-green-100': isToday, 'cursor-pointer': hasReservation }
                )}>
                <div className='relative flex'>
                  <span
                    className={`body-12 sm:body-16 ${!isCurrentMonthDay ? 'text-gray-300' : 'text-gray-800'}`}>
                    {format(day, 'd')}
                  </span>
                  {hasReservation && (
                    <div className='absolute left-12 size-4 rounded-full bg-red-500 sm:left-20 sm:size-6' />
                  )}
                </div>

                {hasReservation && <ReservationBadge reservation={reservation} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
