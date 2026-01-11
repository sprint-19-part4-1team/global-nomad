/**
 * URL 쿼리 파라미터의 페이지 번호를 파싱하여 유효한 숫자로 변환
 *
 * @description
 * - 유효하지 않은 값(문자열, 음수, 0, NaN, Infinity 등)은 1로 보정됩니다.
 * - 소수점이 있는 경우 내림 처리됩니다.
 * - 페이지네이션 컴포넌트에서 URL 쿼리 파라미터를 안전하게 파싱하기 위해 사용됩니다.
 *
 * @param {string} value - URL에서 가져온 쿼리 파라미터 값
 * @returns {number} 파싱된 페이지 번호 (최소값: 1)
 *
 * @example
 * ```typescript
 * parsePageQueryParam('2');      // 2
 * parsePageQueryParam('3.7');    // 3 (내림 처리)
 * parsePageQueryParam('0');      // 1 (0 이하는 1로 보정)
 * parsePageQueryParam('-5');     // 1 (음수는 1로 보정)
 * parsePageQueryParam('abc');    // 1 (유효하지 않은 값은 1로 보정)
 * parsePageQueryParam('');       // 1 (빈 문자열은 1로 보정)
 * ```
 */
export const parsePageQueryParam = (value: string): number => {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) {
    return 1;
  }
  return Math.floor(n);
};
