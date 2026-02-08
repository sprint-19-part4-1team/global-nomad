import { useMemo } from 'react';
import {
  calculateDateConfig,
  canNavigateToNextMonth,
  canNavigateToPrevMonth,
  createReservationMap,
  generateCalendarDays,
  getReservationForDate,
} from '@/features/mypage/reservation-status/utils/calendarUtils';
import type { FindReservationsByMonthResponseDto } from '@/shared/types/myActivities';

/**
 * useReservationCalendar 훅의 매개변수 타입
 *
 * @property reservations - 표시할 예약 데이터 배열
 * @property currentMonth - 현재 표시 중인 월
 */
interface UseReservationCalendarParams {
  reservations: readonly FindReservationsByMonthResponseDto[];
  currentMonth: Date;
}

/**
 * useReservationCalendar 훅의 반환 타입
 *
 * @property reservationMap - 날짜를 key로 하는 예약 데이터 Map
 * @property today - 오늘 날짜
 * @property minDate - 선택 가능한 최소 월
 * @property maxDate - 선택 가능한 최대 월
 * @property monthStart - 현재 표시 중인 월의 시작 날짜
 * @property startDate - 캘린더에 표시될 시작 날짜
 * @property canGoPrevMonth - 이전 달로 이동 가능 여부
 * @property canGoNextMonth - 다음 달로 이동 가능 여부
 * @property calendarDays - 달력에 표시할 날짜 배열
 * @property getReservationForDateMemo - 특정 날짜의 예약 데이터를 조회하는 함수
 */
interface UseReservationCalendarReturn {
  reservationMap: Map<string, FindReservationsByMonthResponseDto>;
  today: Date;
  minDate: Date;
  maxDate: Date;
  monthStart: Date;
  startDate: Date;
  canGoPrevMonth: boolean;
  canGoNextMonth: boolean;
  calendarDays: Date[];
  getReservationForDateMemo: (date: Date) => FindReservationsByMonthResponseDto | undefined;
}

/**
 * 예약 달력의 모든 로직을 관리하는 커스텀 훅
 *
 * @description
 * - 예약 데이터를 Map으로 변환하여 빠른 조회 제공
 * - 달력 렌더링에 필요한 날짜 계산
 * - 월 네비게이션 가능 여부 판단
 *
 * @param params - 훅 매개변수
 * @returns 달력 렌더링에 필요한 모든 상태와 함수
 *
 * @example
 * ```tsx
 * const {
 *   reservationMap,
 *   today,
 *   canGoPrevMonth,
 *   canGoNextMonth,
 *   calendarDays,
 *   getReservationForDateMemo
 * } = useReservationCalendar({
 *   reservations,
 *   currentMonth
 * });
 * ```
 */
export const useReservationCalendar = ({
  reservations,
  currentMonth,
}: UseReservationCalendarParams): UseReservationCalendarReturn => {
  /**
   * 예약 데이터를 날짜(date)를 key로 하는 Map 형태로 변환
   */
  const reservationMap = useMemo(() => createReservationMap(reservations), [reservations]);

  /**
   * 캘린더 렌더링 및 월 이동 제어에 필요한 날짜 관련 설정 값을 계산
   */
  const dateConfig = useMemo(() => calculateDateConfig(currentMonth), [currentMonth]);

  const { today, minDate, maxDate, monthStart, startDate } = dateConfig;

  /**
   * 이전 달로 이동 가능한지 여부를 판단
   */
  const canGoPrevMonth = useMemo(
    () => canNavigateToPrevMonth(currentMonth, minDate),
    [currentMonth, minDate]
  );

  /**
   * 다음 달로 이동 가능한지 여부를 판단
   */
  const canGoNextMonth = useMemo(
    () => canNavigateToNextMonth(currentMonth, maxDate),
    [currentMonth, maxDate]
  );

  /**
   * 현재 월의 달력에 표시할 모든 날짜 생성
   */
  const calendarDays = useMemo(() => generateCalendarDays(startDate), [startDate]);

  /**
   * 특정 날짜의 예약 데이터를 조회하는 메모이제이션된 함수
   */
  const getReservationForDateMemo = useMemo(
    () => (date: Date) => getReservationForDate(date, reservationMap),
    [reservationMap]
  );

  return {
    reservationMap,
    today,
    minDate,
    maxDate,
    monthStart,
    startDate,
    canGoPrevMonth,
    canGoNextMonth,
    calendarDays,
    getReservationForDateMemo,
  };
};
