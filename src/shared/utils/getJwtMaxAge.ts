/**
 *  ## JwtPayload
 *  @type [exp] - 만료 시각
 *  @type [iat] - 발급 시각
 */
type JwtPayload = {
  exp: number;
  iat: number;
};

/**
 * ## getJwtMaxAge
 * JWT 토큰의 payload를 디코딩하여
 * 현재 시점 기준으로 남아있는 유효 시간을 초 단위로 반환합니다.
 *
 * @param token - JWT 문자열 (accessToken 또는 refreshToken)
 * @returns 토큰 유효시간
 */
export const getJwtMaxAge = (token: string): number => {
  const payloadBase64 = token.split('.')[1];
  const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
  const payload = JSON.parse(payloadJson) as JwtPayload;

  const now = Math.floor(Date.now() / 1_000);
  return Math.max(payload.exp - now, 0);
};
