import { format } from 'date-fns';

/**
 * Date 객체를 YYYY-MM-DD 형식의 문자열로 변환합니다.
 *
 * API 요청이나 데이터 저장 시 사용되는 표준 날짜 형식으로 변환합니다.
 * date-fns의 format 함수를 사용하여 일관된 형식을 보장합니다.
 *
 * @param {Date} date - 변환할 Date 객체
 * @returns {string} YYYY-MM-DD 형식의 날짜 문자열
 *
 * @example
 * ```typescript
 * formatDateToString(new Date('2026-01-15T10:30:00'))
 * // returns: '2026-01-15'
 *
 * formatDateToString(new Date('2026-03-05'))
 * // returns: '2026-03-05'
 * ```
 */
export const formatDateToString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * 날짜를 YYYY. MM. DD 형식의 문자열로 변환합니다.
 *
 * 사용자에게 보여지는 날짜를 한국 로케일 형식 (YYYY. MM. DD)으로 포맷팅합니다.
 * date-fns의 format 함수를 사용하여 점(.)으로 구분된 형식을 생성합니다.
 *
 * @param {Date} date - 변환할 Date 객체
 * @returns {string} 'YYYY. MM. DD' 형식의 날짜 문자열
 *
 * @example
 * ```typescript
 * formatDateForDisplay(new Date('2026-01-15'))
 * // returns: '2026. 01. 15'
 *
 * formatDateForDisplay(new Date('2026-12-25'))
 * // returns: '2026. 12. 25'
 * ```
 */
export const formatDateForDisplay = (date: Date): string => {
  return format(date, 'yyyy. MM. dd');
};
