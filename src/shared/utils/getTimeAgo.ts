/**
 * updatedAt 기준으로 상대 시간 문자열을 반환
 *
 * 기준:
 * - 1분 미만: 방금 전
 * - 1분 ~ 1시간 미만: ~분 전
 * - 1시간 ~ 24시간 미만: ~시간 전
 * - 1일 ~ 7일 미만: ~일 전
 * - 7일 ~ 30일 미만: ~주 전
 * - 30일 ~ 1년 미만: ~달 전 (달력 기준)
 * - 1년 이후: 오래 전
 */
export function getTimeAgo(updatedAt: string): string {
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

  // 현재보다 빠른 시간일 때
  if (diffMs < 0) {
    return '방금 전';
  }

  // 1분 미만
  if (diffMin < 1) {
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
    const weeks = Math.max(1, Math.floor(diffDay / 7));
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
}
