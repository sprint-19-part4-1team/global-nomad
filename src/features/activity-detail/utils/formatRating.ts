/**
 * 숫자를 소수점 첫째 자리까지 반올림합니다.
 *
 * @param value - 반올림할 숫자
 * @returns 소수점 첫째 자리까지 반올림된 숫자
 *
 * @example
 * ```typescript
 * formatRating(4.74);   // 4.7
 * formatRating(4.75);   // 4.8
 * formatRating(4.7);    // 4.7
 * formatRating(5);      // 5.0
 * ```
 */
export const formatRating = (value: number): number => {
  return Math.round(value * 10) / 10;
};
