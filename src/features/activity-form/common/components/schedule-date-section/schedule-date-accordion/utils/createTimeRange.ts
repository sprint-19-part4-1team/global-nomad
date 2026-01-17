/**
 * ## createTimeRange
 *
 * 지정된 시작/종료 시각 사이의 시간을
 * 일정 간격(분 단위)으로 생성하는 유틸함수입니다.
 */
export const createTimeRange = (
  startHour: number,
  endHour: number,
  intervalMinutes = 60
): string[] => {
  const result: string[] = [];

  for (let minutes = startHour * 60; minutes <= endHour * 60; minutes += intervalMinutes) {
    const hour = String(Math.floor(minutes / 60)).padStart(2, '0');
    const minute = String(minutes % 60).padStart(2, '0');
    result.push(`${hour}:${minute}`);
  }

  return result;
};
