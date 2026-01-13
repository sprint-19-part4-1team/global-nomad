/**
 * 주소 문자열에서 우편번호와 상세주소를 제거하고 주요 주소만 반환합니다.
 *
 * @param address - 원본 주소 문자열 (형식: "[우편번호] 주요주소 | 상세주소")
 * @returns 주요 주소만 포함된 문자열
 *
 * @example
 * ```typescript
 * const mainAddress = parseAddress("[06236] 서울 강남구 테헤란로26길 14 | 역삼동, 위워크빌딩");
 * console.log(mainAddress); // "서울 강남구 테헤란로26길 14"
 * ```
 */
export const parseAddress = (address: string): string => {
  // [우편번호] 제거
  const withoutPostalCode = address.replace(/^\[\d{5}\]\s*/, '');

  // | 기준으로 분리하여 주요 주소만 반환
  const [mainAddress] = withoutPostalCode.split('|').map((s) => s.trim());

  return mainAddress || address;
};
