import { UserServiceResponseDto } from '@/shared/types/user';

/**
 * 로그인 요청
 *
 * @description
 * - 사용자 로그인을 위해 클라이언트에서 서버로 전달되는 요청 데이터입니다.
 * - 이메일과 비밀번호를 포함합니다.
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * 인증 토큰 응답 (백엔드 API)
 *
 * @description
 * - 인증 성공 시 발급되는 토큰 정보입니다.
 * - accessToken과 refreshToken을 포함합니다.
 */
export interface TokensResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 * 로그인 성공 응답 (백엔드 API)
 *
 * @description
 * - 로그인 성공 시 백엔드 인증 API에서 반환하는 응답 타입입니다.
 * - 발급된 토큰 정보와 로그인한 사용자 정보를 포함합니다.
 */
export interface LoginResponse extends TokensResponse {
  user: UserServiceResponseDto;
}

/**
 * 로그인 성공 응답 (Next API)
 *
 * @description
 * - 로그인 성공 시 Next API가 클라이언트에 반환하는 응답 타입입니다.
 *
 * @property user
 * - 로그인한 사용자 정보
 *
 * @property accessTokenExpiresAt
 * - accessToken의 만료 시각 (ms timestamp)
 * - JWT의 `exp` 값을 기반으로 BFF에서 계산됩니다.
 */
export interface BffLoginResponse {
  user: UserServiceResponseDto;
  accessTokenExpiresAt: number;
}

/**
 * 토큰 재발급 성공 응답 (Next API)
 *
 * @description
 * - refresh token을 사용하여 새로운 access token이 발급되었을 때
 *   Next API(BFF)가 클라이언트에 반환하는 응답 타입입니다.
 *
 * @property message
 * - 토큰 재발급 처리 결과에 대한 안내 메시지
 *
 * @property accessTokenExpiresAt
 * - 새로 발급된 accessToken의 만료 시각 (ms timestamp)
 * - JWT의 `exp` 값을 기반으로 BFF에서 계산됩니다.
 */
export interface BffRefreshTokenResponse {
  message: string;
  accessTokenExpiresAt: number;
}
