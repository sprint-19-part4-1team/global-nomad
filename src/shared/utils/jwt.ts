/**
 *  ## JwtPayload
 *  @type {number} exp - 만료 시각
 *  @type {number} iat - 발급 시각
 */
type JwtPayload = {
  exp: number;
  iat: number;
};

/**
 * ## parseJwtPayload
 * JWT 토큰의 payload를 디코딩하여 반환합니다.
 *
 * @param token - JWT 문자열
 * @returns JwtPayload
 */
const parseJwtPayload = (token: string): JwtPayload => {
  const payloadBase64 = token.split('.')[1];
  const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
  return JSON.parse(payloadJson) as JwtPayload;
};

/**
 * ## getJwtMaxAge
 * JWT 토큰의 payload를 디코딩하여
 * 현재 시점 기준으로 남아있는 유효 시간을 초 단위로 반환합니다.
 *
 * @param {string} token - JWT 문자열 (accessToken 또는 refreshToken)
 * @returns {number} 토큰 유효시간
 */
export const getJwtMaxAge = (token: string): number => {
  const { exp } = parseJwtPayload(token);

  const now = Math.floor(Date.now() / 1_000);
  return Math.max(exp - now, 0);
};

/**
 * ## getJwtExpiresAt
 * JWT 토큰의 payload를 디코딩하여
 * 만료 시각을 ms timestamp로 반환합니다.
 *
 * @param {string} token - JWT 문자열
 * @returns {number} 만료 시각 (ms)
 */
export const getJwtExpiresAt = (token: string): number => {
  const { exp } = parseJwtPayload(token);

  return exp * 1_000;
};
