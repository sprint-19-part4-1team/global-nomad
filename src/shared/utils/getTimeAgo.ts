/**
 * updatedAt 기준으로 상대 시간 문자열을 반환
 * @remarks
 * - 현재 시각은 함수 호출 시점의 브라우저 시간을 기준으로 계산됩니다.
 * - 브라우저 시간과 서버 시간의 오차로 인해 미래 시간이 전달될 수 있으므로,
 *   미래 시각에 대해서는 UX 관점에서 모두 `방금 전`으로 처리합니다.
 * - 월 단위 계산은 달력 기준(연/월/일)을 사용하여 2월 및 월별 일수 차이로 인한
 *   과장된 표현을 방지합니다.
 *
 * @example
 * getTimeAgo('2025-12-26T12:00:00Z'); // "방금 전", "3분 전", "2일 전" 등
 *
 * @param updatedAt - 기준이 되는 시간
 * @returns 상대적인 시간
 *
 * 시간 기준:
 * - 1분 미만: 방금 전
 * - 1분 ~ 1시간 미만: ~분 전
 * - 1시간 ~ 24시간 미만: ~시간 전
 * - 1일 ~ 7일 미만: ~일 전
 * - 7일 ~ 30일 미만: ~주 전
 * - 30일 ~ 1년 미만: ~달 전 (달력 기준)
 * - 1년 이후: 오래 전
 */

export const getTimeAgo = (updatedAt: string): string => {
  const now = new Date();
  const updated = new Date(updatedAt);

  // 날짜 파싱 실패 시 원본 리턴
  if (Number.isNaN(updated.getTime())) {
    return updatedAt;
  }

  const diffMs = now.getTime() - updated.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  // 현재보다 빠른 시간이거나 1분 미만일 때
  if (diffMs < 0 || diffMin < 1) {
    return '방금 전';
  }

  // 1분 ~ 1시간
  if (diffMin < 60) {
    return `${diffMin}분 전`;
  }

  // 1시간 ~ 24시간
  if (diffHour < 24) {
    return `${diffHour}시간 전`;
  }

  // 1일 ~ 7일
  if (diffDay < 7) {
    return `${diffDay}일 전`;
  }

  // 7일 ~ 30일 -> 주 단위
  if (diffDay < 30) {
    const weeks = Math.floor(diffDay / 7);
    return `${weeks}주 전`;
  }

  // 30일 이상 -> (2월, 28~31일 때문에 월로 계산) 달력 기준 개월 수 계산
  let months =
    (now.getFullYear() - updated.getFullYear()) * 12 + (now.getMonth() - updated.getMonth());

  // 아직 해당 달이 완전히 지나지 않았으면 1개월 차감
  if (now.getDate() < updated.getDate()) {
    months -= 1;
  }

  months = Math.max(1, months);

  // 1년 이상
  if (months >= 12) {
    return '오래 전';
  }

  // 1달 ~ 1년
  return `${months}달 전`;
};
