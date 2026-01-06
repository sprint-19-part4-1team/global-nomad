'use client';

import {
  format,
  startOfMonth,
  startOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isBefore,
  startOfDay,
  isSameDay,
  isAfter,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import Icons from '@/assets/icons';
import { FindReservationsByMonthResponseDto } from '@/shared/types/myActivities';

/**
 * ReservationCalendar 컴포넌트의 Props
 *
 * @property {readonly FindReservationsByMonthResponseDto[]} reservations - 표시할 예약 데이터 배열
 * @property {Date} currentMonth - 현재 표시 중인 월.
 * @property {(newMonth: Date) => void} onMonthChange - 월 변경 시 호출되는 콜백 함수
 */
interface ReservationCalendarProps {
  /** 표시할 예약 데이터 배열 */
  reservations: readonly FindReservationsByMonthResponseDto[];
  /** 현재 표시 중인 월 */
  currentMonth: Date;
  /** 월 변경 시 호출되는 콜백 */
  onMonthChange: (newMonth: Date) => void;
}

/** 요일 헤더 배열 (일요일부터 토요일까지) */
const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/** 달력 스타일 상수 */
const CALENDAR_STYLE = {
  /** 월 이동 버튼 스타일 */
  MONTH_BTN: 'h-20 w-20 cursor-pointer sm:h-24 sm:w-24',
  /** 예약 상태 표시 스타일 */
  STATUS:
    'flex h-16 items-center justify-between rounded-4 px-8 py-2 text-[10px] tracking-[-0.25px] whitespace-nowrap sm:h-21 sm:text-[14px] sm:tracking-[-0.35px]',
};

/**
 * 체험 예약 현황을 표시하는 월간 달력 컴포넌트
 *
 * @description
 * - 월 단위로 예약 현황을 시각적으로 표시
 * - 각 날짜별로 완료/승인/예약 건수 표시
 * - 이전/다음 달 네비게이션 지원 (현재 달 ~ 현재 달 +4개월)
 * - 예약이 있는 날짜는 클릭 가능 (hover 효과)
 * - 오늘 날짜는 노란색 배경으로 표시
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
  const today = startOfDay(new Date());

  // 최소 날짜: 현재 달
  const minDate = startOfMonth(today);
  // 최대 날짜: 현재 달 + 4개월
  const maxDate = startOfMonth(addMonths(today, 4));

  const monthStart = startOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });

  // 이전 달로 이동 가능 여부 체크
  const canGoPrevMonth = !isBefore(subMonths(currentMonth, 1), minDate);

  // 다음 달로 이동 가능 여부 체크
  const canGoNextMonth = !isAfter(addMonths(currentMonth, 1), maxDate);

  /**
   * 특정 날짜의 예약 데이터를 조회
   *
   * @param date - 조회할 날짜
   * @returns 해당 날짜의 예약 데이터 또는 undefined
   */
  const getReservationForDate = (date: Date): FindReservationsByMonthResponseDto | undefined => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return reservations.find((r) => r.date === dateStr);
  };

  /**
   * 현재 월의 달력에 표시할 모든 날짜 생성
   *
   * @description
   * 달력을 5행 7열(35개 셀)로 고정하여 표시
   *
   * @returns 달력에 표시할 날짜 배열 (항상 35개)
   */
  const generateCalendarDays = (): Date[] => {
    const days: Date[] = [];
    let day = startDate;

    // 5주(35일)만 표시
    for (let i = 0; i < 35; i++) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  /**
   * 날짜 클릭 핸들러
   *
   * @description
   * 예약이 있는 날짜를 클릭했을 때 해당 날짜 정보를 콘솔에 출력
   *
   * @param date - 클릭된 날짜
   */
  const handleDateClick = (date: Date) => {
    // TODO: 예약 정보 모달 표시
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
        <h2 className='body-18 font-bold text-gray-950 sm:heading-20'>
          {format(currentMonth, 'yyyy년 M월', { locale: ko })}
        </h2>
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

      <div className='flex flex-col gap-4 sm:gap-12'>
        {/* 요일 헤더 */}
        <div className='grid grid-cols-7'>
          {WEEK_DAYS.map((day, idx) => (
            <div key={idx} className='p-12 text-center body-13 font-bold text-gray-900 sm:body-16'>
              {day}
            </div>
          ))}
        </div>

        <div className='grid grid-cols-7'>
          {calendarDays.map((day, index) => {
            const reservation = getReservationForDate(day);
            const isCurrentMonthDay = isSameMonth(day, currentMonth);
            const isPastDate = isBefore(startOfDay(day), today);
            const isToday = isSameDay(day, today);
            const hasReservation = reservation && isCurrentMonthDay;

            return (
              <div
                key={index}
                onClick={() => hasReservation && !isPastDate && handleDateClick(day)}
                className={`flex h-104 flex-col items-center gap-6 border-t px-4 pt-10 pb-6 sm:h-124 sm:gap-5 sm:px-12 sm:pt-18 sm:pb-10 ${index < 7 ? 'border-gray-100' : 'border-gray-50'} ${isToday && 'bg-green-100'} ${hasReservation && 'cursor-pointer'}`}>
                <div className='relative flex'>
                  <span
                    className={`body-12 sm:body-16 ${!isCurrentMonthDay ? 'text-gray-300' : 'text-gray-800'}`}>
                    {format(day, 'd')}
                  </span>
                  {hasReservation && !isPastDate && (
                    <div className='absolute left-12 size-4 rounded-full bg-red-500 sm:left-20 sm:size-6' />
                  )}
                </div>

                {hasReservation && !isPastDate && (
                  <div className='flex flex-col gap-6 sm:gap-5'>
                    {reservation.reservations.completed > 0 && (
                      <div className={`${CALENDAR_STYLE.STATUS} gap-3 bg-gray-50 text-gray-500`}>
                        <span>완료</span>
                        <span>{reservation.reservations.completed}</span>
                      </div>
                    )}
                    {reservation.reservations.pending > 0 && (
                      <div
                        className={`${CALENDAR_STYLE.STATUS} gap-2 bg-primary-100 text-primary-500`}>
                        <span>예약</span>
                        <span>{reservation.reservations.pending}</span>
                      </div>
                    )}
                    {reservation.reservations.confirmed > 0 && (
                      <div
                        className={`${CALENDAR_STYLE.STATUS} gap-2 bg-orange-100 text-orange-500`}>
                        <span>승인</span>
                        <span>{reservation.reservations.confirmed}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
