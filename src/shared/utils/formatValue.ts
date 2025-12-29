/**
 * 숫자 또는 숫자 문자열을 받아 천 단위 콤마가 포함된 문자열로 포맷팅하는 함수
 *
 * @remarks
 * - 문자열이 입력되면 자동으로 숫자로 변환을 시도합니다
 * - 변환할 수 없는 값(예: "abc")은 undefined를 반환합니다
 * - 한국 로케일(ko-KR)을 사용하여 포맷팅합니다
 *
 * @param value - 포맷팅할 숫자 또는 숫자 문자열
 * @returns 콤마가 추가된 문자열. 유효하지 않은 값이면 undefined 반환
 *
 * @example
 * ```typescript
 * formatValue(1234567)      // "1,234,567"
 * formatValue("1234567")    // "1,234,567"
 * formatValue(1234567.89)   // "1,234,567.89"
 * formatValue("abc")        // undefined
 * formatValue(NaN)          // undefined
 * ```
 *
 */
export const formatValue = (value: string | number) => {
  const numValue = typeof value === 'string' ? Number(value) : value;

  // 숫자로 변환할 수 없거나 NaN이면 early return
  if (isNaN(numValue)) {
    return;
  }

  return numValue.toLocaleString('ko-KR');
};
