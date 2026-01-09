import { addDays, addMonths, startOfDay, startOfMonth } from 'date-fns';

type ScheduleDateRangePolicy = {
  /** 오늘(00:00) 기준 최소 선택 가능 날짜 */
  minDate: Date;
  /** 오늘 기준 `days`일 이후의 최대 선택 가능 날짜 */
  maxDate: Date;
  /** 달 네비게이션이 시작되는 월 (현재 달의 1일) */
  startMonth: Date;
  /** 달 네비게이션이 종료되는 월 (현재 달 + 2개월) */
  endMonth: Date;
};

/**
 * ## getScheduleDateRange
 * 일정 선택(DatePicker)을 위한 날짜 범위 정책을 생성합니다.
 *
 * @description
 * - 기준일을 오늘(startOfDay)로 정규화하여 시간에 따른 오차를 제거합니다.
 * - 오늘 이전 날짜는 선택할 수 없도록 `minDate`를 제공합니다.
 * - 오늘 기준 `days`일 이후까지 선택 가능하도록 `maxDate`를 제공합니다.
 * - 달 이동은 현재 달부터 최대 2개월 이후까지 허용하도록
 *   `startMonth`, `endMonth`를 계산합니다.
 *
 * @param days - 오늘 기준으로 선택 가능한 최대 일 수
 *
 * @returns 일정 선택에 사용되는 날짜 범위 정책 객체
 */
export const getScheduleDateRange = (days: number): ScheduleDateRangePolicy => {
  const baseDate = new Date();
  const today = startOfDay(baseDate);

  const minDate = today;
  const maxDate = addDays(today, days);

  const startMonth = startOfMonth(today);
  const endMonth = addMonths(startMonth, 2);

  return {
    minDate,
    maxDate,
    startMonth,
    endMonth,
  };
};
