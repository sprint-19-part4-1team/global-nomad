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
