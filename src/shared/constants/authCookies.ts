/**
 * ## AUTH_COOKIE_KEYS
 *
 * @description
 * - 인증과 관련된 HttpOnly 쿠키 키 상수입니다.
 * - access / refresh token 쿠키 이름을 일관되게 관리하기 위해 사용됩니다.
 */
export const AUTH_COOKIE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

/**
 * ## COOKIE_OPTIONS
 *
 * @description
 * - 서버에서 설정하는 인증 관련 쿠키에 대한 공통 옵션입니다.
 * - 보안 및 CSRF 방어를 고려한 기본 설정을 제공합니다.
 *
 * @remarks
 * - 이 옵션은 주로 `Set-Cookie` 헤더를 설정할 때 사용됩니다.
 * - Next.js API Route 또는 Middleware, Server Action 등
 *   서버 환경에서만 사용되는 것을 전제로 합니다.
 *
 * @property httpOnly
 * - JavaScript를 통한 쿠키 접근을 차단합니다.
 * - XSS 공격으로부터 쿠키 탈취를 방지하기 위한 필수 옵션입니다.
 *
 * @property secure
 * - HTTPS 연결에서만 쿠키를 전송하도록 제한합니다.
 * - 로컬 개발 환경에서는 HTTP를 사용하므로,
 *   `production` 환경에서만 활성화됩니다.
 *
 * @property sameSite
 * - CSRF(Cross-Site Request Forgery) 공격을 방지하기 위한 설정입니다.
 * - `'lax'` 값은 대부분의 일반적인 요청에서는 쿠키를 허용하면서,
 *   외부 사이트에서의 위험한 요청은 제한하는 균형 잡힌 옵션입니다.
 *
 * @property path
 * - 쿠키가 전송될 요청 경로를 지정합니다.
 * - `'/'`로 설정하여 애플리케이션 전체 경로에서 쿠키를 사용할 수 있습니다.
 */
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
} as const;
