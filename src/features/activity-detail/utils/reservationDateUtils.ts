import { ScheduleResponseDto } from '@/shared/types/activities';

/**
 * Date 객체를 YYYY-MM-DD 형식의 문자열로 변환합니다.
 *
 * API 요청이나 데이터 저장 시 사용되는 표준 날짜 형식으로 변환합니다.
 * 월과 일은 항상 2자리 숫자로 표시됩니다 (예: 01, 02, ..., 12).
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
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 날짜를 한국어 표시 형식으로 변환합니다.
 *
 * 사용자에게 보여지는 날짜를 한국 로케일 형식 (YYYY. MM. DD)으로 포맷팅합니다.
 * toLocaleDateString을 사용하여 브라우저의 로케일 설정을 따릅니다.
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
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * 날짜와 시간 정보를 조합하여 표시용 문자열을 생성합니다.
 *
 * 예약 확인 화면이나 선택 완료 후 표시되는 날짜/시간 정보를
 * 사용자 친화적인 형식으로 조합합니다.
 * 날짜나 시간 정보가 없는 경우 빈 문자열을 반환합니다.
 *
 * @param {Date | undefined} date - 날짜 객체
 * @param {Object | undefined} timeInfo - 시간 정보 객체
 * @param {string} timeInfo.startTime - 시작 시간 (HH:MM 형식)
 * @param {string} timeInfo.endTime - 종료 시간 (HH:MM 형식)
 * @returns {string} 조합된 날짜/시간 문자열, 정보가 없으면 빈 문자열
 *
 * @example
 * ```typescript
 * formatDateTimeForDisplay(
 *   new Date('2026-01-15'),
 *   { startTime: '12:00', endTime: '13:00' }
 * )
 * // returns: '2026. 01. 15 12:00 - 13:00'
 *
 * formatDateTimeForDisplay(undefined, { startTime: '12:00', endTime: '13:00' })
 * // returns: ''
 * ```
 */
export const formatDateTimeForDisplay = (
  date: Date | undefined,
  timeInfo: { startTime: string; endTime: string } | undefined
): string => {
  if (!date || !timeInfo) {
    return '';
  }
  return `${formatDateForDisplay(date)} ${timeInfo.startTime} - ${timeInfo.endTime}`;
};

/**
 * 스케줄 배열을 날짜별 시간대 맵으로 변환합니다.
 *
 * API에서 받은 스케줄 데이터를 날짜를 키로 하는 객체로 변환하여
 * 특정 날짜의 예약 가능한 시간대를 빠르게 조회할 수 있도록 합니다.
 * reduce를 사용하여 O(n) 시간 복잡도로 변환합니다.
 *
 * @param {ScheduleResponseDto[]} schedules - 스케줄 배열
 * @returns {Record<string, Array<{id: number, startTime: string, endTime: string}>>}
 *          날짜 문자열을 키로 하는 시간대 배열 맵
 *
 * @example
 * ```typescript
 * const schedules = [
 *   {
 *     date: '2026-01-15',
 *     times: [
 *       { id: 1, startTime: '12:00', endTime: '13:00' },
 *       { id: 2, startTime: '14:00', endTime: '15:00' }
 *     ]
 *   }
 * ];
 *
 * getSchedulesByDate(schedules)
 * // returns: {
 * //   '2026-01-15': [
 * //     { id: 1, startTime: '12:00', endTime: '13:00' },
 * //     { id: 2, startTime: '14:00', endTime: '15:00' }
 * //   ]
 * // }
 * ```
 */
export const getSchedulesByDate = (schedules: ScheduleResponseDto[]) => {
  return schedules.reduce(
    (acc, schedule) => {
      acc[schedule.date] = schedule.times;
      return acc;
    },
    {} as Record<string, Array<{ id: number; startTime: string; endTime: string }>>
  );
};

/**
 * 오늘 이후의 예약 가능한 날짜 목록을 반환합니다.
 *
 * 전체 스케줄에서 기준 날짜(일반적으로 오늘) 이후의 날짜만 필터링하여
 * Date 객체 배열로 반환합니다. 이 배열은 달력 컴포넌트에서
 * 선택 가능한 날짜를 표시하는 데 사용됩니다.
 *
 * @param {ScheduleResponseDto[]} schedules - 스케줄 배열
 * @param {Date} today - 기준 날짜 (일반적으로 오늘 날짜)
 * @returns {Date[]} 예약 가능한 날짜 배열 (기준 날짜 포함, 이후 날짜만)
 *
 * @example
 * ```typescript
 * const schedules = [
 *   { date: '2026-01-10', times: [...] },
 *   { date: '2026-01-15', times: [...] },
 *   { date: '2026-01-20', times: [...] }
 * ];
 *
 * getAvailableDates(schedules, new Date('2026-01-12'))
 * // returns: [Date('2026-01-15'), Date('2026-01-20')]
 * ```
 */
export const getAvailableDates = (schedules: ScheduleResponseDto[], today: Date): Date[] => {
  return schedules.map((schedule) => new Date(schedule.date)).filter((date) => date >= today);
};
