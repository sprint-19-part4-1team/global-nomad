/**
 * Common message
 *
 * @description
 * 공통으로 사용되는 오류 메시지 상수
 */
export const COMMON_MESSAGE = {
  NETWORK_ERROR: '네트워크 오류가 발생했습니다.',
} as const;

/**
 * 인증(Auth) 관련 API 응답 메시지 상수
 *
 * @description
 * - 로그인, 로그아웃, 토큰 갱신 등 인증 도메인에서
 *   서버 API가 반환하는 응답 메시지를 도메인/행위 단위로 정의합니다.
 */
export const AUTH_API_MESSAGE = {
  LOGIN: {
    FAILED: '로그인에 실패했습니다.',
  },
  LOGOUT: {
    SUCCESS: '로그아웃 되었습니다.',
    FAILED: '로그아웃에 실패했습니다.',
  },
  TOKEN: {
    REFRESH_SUCCESS: '토큰 갱신에 성공했습니다.',
    REFRESH_FAILED: '토큰 갱신에 실패했습니다.',
  },
} as const;

/**
 * 인증(Auth) 관련 클라이언트 메시지 상수
 *
 * @description
 * - 서버 API 응답과 무관하게
 * - 클라이언트 인증 상태 변화(세션 만료, 접근 제한 등)에 따라
 *   사용자에게 노출되는 메시지를 정의합니다.
 */
export const AUTH_CLIENT_MESSAGE = {
  SESSION_EXPIRED: '로그인 시간이 만료되었습니다. 다시 로그인해 주세요.',
  UNAUTHORIZED: '로그인이 필요합니다.',
} as const;
