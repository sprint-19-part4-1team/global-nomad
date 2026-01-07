import {
  format,
  startOfMonth,
  startOfWeek,
  addDays,
  addMonths,
  subMonths,
  isBefore,
  startOfDay,
  isAfter,
} from 'date-fns';
import type { FindReservationsByMonthResponseDto } from '@/shared/types/myActivities';

/**
 * 예약 데이터를 날짜(date)를 key로 하는 Map 형태로 변환
 *
 * @param reservations - 예약 데이터 배열
 * @returns 날짜를 key로 하는 예약 데이터 Map
 */
export function createReservationMap(
  reservations: readonly FindReservationsByMonthResponseDto[]
): Map<string, FindReservationsByMonthResponseDto> {
  const map = new Map<string, FindReservationsByMonthResponseDto>();
  reservations.forEach((reservation) => {
    map.set(reservation.date, reservation);
  });
  return map;
}

/**
 * 캘린더 렌더링 및 월 이동 제어에 필요한 날짜 관련 설정 값을 계산
 *
 * @param currentMonth - 현재 표시 중인 월
 * @returns 날짜 계산에 필요한 설정 객체
 */
export function calculateDateConfig(currentMonth: Date) {
  const today = startOfDay(new Date());
  const minDate = startOfMonth(new Date(2026, 0, 1)); // 2026년 1월로 고정
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
}

/**
 * 이전 달로 이동 가능한지 여부를 판단
 *
 * @param currentMonth - 현재 표시 중인 월
 * @param minDate - 선택 가능한 최소 월
 * @returns 이전 달로 이동 가능 여부
 */
export function canNavigateToPrevMonth(currentMonth: Date, minDate: Date): boolean {
  return !isBefore(subMonths(currentMonth, 1), minDate);
}

/**
 * 다음 달로 이동 가능한지 여부를 판단
 *
 * @param currentMonth - 현재 표시 중인 월
 * @param maxDate - 선택 가능한 최대 월
 * @returns 다음 달로 이동 가능 여부
 */
export function canNavigateToNextMonth(currentMonth: Date, maxDate: Date): boolean {
  return !isAfter(addMonths(currentMonth, 1), maxDate);
}

/**
 * 현재 월의 달력에 표시할 모든 날짜 생성
 *
 * @description
 * 달력을 5행 7열(35개 셀)로 고정하여 표시
 *
 * @param startDate - 캘린더에 표시될 시작 날짜
 * @returns 달력에 표시할 날짜 배열 (항상 35개)
 */
export function generateCalendarDays(startDate: Date): Date[] {
  const days: Date[] = [];
  let day = startDate;

  // 5주(35일)만 표시
  for (let i = 0; i < 35; i++) {
    days.push(day);
    day = addDays(day, 1);
  }

  return days;
}

/**
 * 특정 날짜의 예약 데이터를 조회
 *
 * @param date - 조회할 날짜
 * @param reservationMap - 날짜를 key로 하는 예약 데이터 Map
 * @returns 해당 날짜의 예약 데이터 또는 undefined
 */
export function getReservationForDate(
  date: Date,
  reservationMap: Map<string, FindReservationsByMonthResponseDto>
): FindReservationsByMonthResponseDto | undefined {
  const dateStr = format(date, 'yyyy-MM-dd');
  return reservationMap.get(dateStr);
}
