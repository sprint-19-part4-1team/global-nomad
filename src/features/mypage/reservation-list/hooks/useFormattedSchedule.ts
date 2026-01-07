/**
 * @description
 * - API에서 내려오는 date / startTime / endTime 값을
 *   예약 카드 UI에서 사용하는 스케줄 문자열로 변환하는 훅입니다.
 * - 날짜 포맷 규칙을 한 곳에서 관리하기 위해 커스텀 훅으로 분리했습니다.
 *
 * @param date - 날짜 문자열 (예: YYYY-MM-DD)
 * @param startTime - 시작 시간 (예: HH:mm)
 * @param endTime - 종료 시간 (예: HH:mm)
 *
 * @returns UI에 표시할 스케줄 문자열
 */
export function useFormattedSchedule(date: string, startTime: string, endTime: string) {
  const formattedDate = formatDate(date);
  return `${formattedDate} · ${startTime} ~ ${endTime}`;
}

function formatDate(date: string) {
  // Already formatted: "YYYY. MM. DD"
  if (/^\d{4}\.\s\d{2}\.\s\d{2}$/.test(date)) {
    return date;
  }

  // API common format: "YYYY-MM-DD"
  const m = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) {
    const [, y, mo, d] = m;
    return `${y}. ${mo}. ${d}`;
  }

  // Fallback
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  const y = String(parsed.getFullYear());
  const mo = String(parsed.getMonth() + 1).padStart(2, '0');
  const d = String(parsed.getDate()).padStart(2, '0');
  return `${y}. ${mo}. ${d}`;
}
