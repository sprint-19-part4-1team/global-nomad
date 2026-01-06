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
import { useMemo } from 'react';
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

/** 예약 상태 유형 */
type ReservationStatusType = 'completed' | 'pending' | 'confirmed';

/** 예약 상태 설정 */
const RESERVATION_STATUS_CONFIG: Record<
  ReservationStatusType,
  {
    label: string;
    style: string;
  }
> = {
  completed: {
    label: '완료',
    style: 'gap-3 bg-gray-50 text-gray-500',
  },
  pending: {
    label: '예약',
    style: 'gap-2 bg-primary-100 text-primary-500',
  },
  confirmed: {
    label: '승인',
    style: 'gap-2 bg-orange-100 text-orange-500',
  },
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
  /**
   * 예약 데이터를 날짜(date)를 key로 하는 Map 형태로 변환
   *
   * @description
   * 날짜 문자열을 기준으로 예약 데이터를 빠르게 조회하기 위해 사용
   *
   * @returns 날짜를 key로 하는 예약 데이터 Map
   */
  const reservationMap = useMemo(() => {
    const map = new Map<string, FindReservationsByMonthResponseDto>();
    reservations.forEach((reservation) => {
      map.set(reservation.date, reservation);
    });
    return map;
  }, [reservations]);

  /**
   * 캘린더 렌더링 및 월 이동 제어에 필요한 날짜 관련 설정 값을 계산
   *
   * @returns 날짜 계산에 필요한 설정 객체
   * - today: 오늘 날짜 (시간 제거)
   * - minDate: 선택 가능한 최소 월
   * - maxDate: 선택 가능한 최대 월
   * - monthStart: 현재 표시 중인 월의 시작 날짜
   * - startDate: 캘린더에 표시될 시작 날짜
   */
  const dateConfig = useMemo(() => {
    const today = startOfDay(new Date());
    const minDate = startOfMonth(today);
    const maxDate = startOfMonth(addMonths(today, 4));
    const monthStart = startOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });

    return {
      today,
      minDate,
      maxDate,
      monthStart,
      startDate,
    };
  }, [currentMonth]);

  const { today, minDate, maxDate, startDate } = dateConfig;

  /**
   * 이전 달로 이동 가능한지 여부를 판단
   *
   * @description
   * 현재 월에서 한 달 이전이 최소 허용 월(minDate)보다 이전인지 여부를 기준으로 판단
   *
   * @returns 이전 달로 이동 가능 여부
   */
  const canGoPrevMonth = useMemo(
    () => !isBefore(subMonths(currentMonth, 1), minDate),
    [currentMonth, minDate]
  );

  /**
   * 다음 달로 이동 가능한지 여부를 판단
   *
   * @description
   * 현재 월에서 한 달 이후가 최대 허용 월(maxDate)을 초과하는지 여부를 기준으로 판단
   *
   * @returns 다음 달로 이동 가능 여부
   */
  const canGoNextMonth = useMemo(
    () => !isAfter(addMonths(currentMonth, 1), maxDate),
    [currentMonth, maxDate]
  );

  /**
   * 특정 날짜의 예약 데이터를 조회
   *
   * @param date - 조회할 날짜
   * @returns 해당 날짜의 예약 데이터 또는 undefined
   */
  const getReservationForDate = (date: Date): FindReservationsByMonthResponseDto | undefined => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return reservationMap.get(dateStr);
  };

  /**
   * 현재 월의 달력에 표시할 모든 날짜 생성
   *
   * @description
   * 달력을 5행 7열(35개 셀)로 고정하여 표시
   *
   * @returns 달력에 표시할 날짜 배열 (항상 35개)
   */
  const calendarDays = useMemo(() => {
    const days: Date[] = [];
    let day = startDate;

    // 5주(35일)만 표시
    for (let i = 0; i < 35; i++) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  }, [startDate]);

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

  /**
   * 예약 상태별 건수를 표시하는 컴포넌트
   *
   * @description
   * 완료, 대기, 확정 등의 예약 상태를 순회하며
   * 각 상태에 해당하는 예약 건수가 존재할 경우에만 UI를 렌더링
   *
   * @param props - ReservationStatus 컴포넌트의 props
   * @param props.reservation - 날짜별 예약 상태 및 건수를 포함한 예약 데이터
   */
  const ReservationStatus = ({
    reservation,
  }: {
    reservation: FindReservationsByMonthResponseDto;
  }) => {
    // 화면에 표시할 예약 상태 타입 목록
    const statusTypes: ReservationStatusType[] = ['completed', 'pending', 'confirmed'];

    return (
      <div className='flex flex-col gap-6 sm:gap-5'>
        {statusTypes.map((statusType) => {
          const count = reservation.reservations[statusType];

          // 해당 상태의 예약 건수가 없는 경우 렌더링하지 않음
          if (count <= 0) {
            return null;
          }

          const config = RESERVATION_STATUS_CONFIG[statusType];

          return (
            <div key={statusType} className={`${CALENDAR_STYLE.STATUS} ${config.style}`}>
              <span>{config.label}</span>
              <span>{count}</span>
            </div>
          );
        })}
      </div>
    );
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

                {hasReservation && !isPastDate && <ReservationStatus reservation={reservation} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
