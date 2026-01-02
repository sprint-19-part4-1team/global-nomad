import { bffFetch } from '@/shared/apis/base/bffFetch';
import type { BffLoginResponse, LogoutResponse, LoginRequest } from '@/shared/types/auth';

/**
 * 로그인 API (BFF)
 *
 * @param data - 로그인에 필요한 사용자 정보
 * @returns 로그인 API 응답 Promise
 */
export const login = (data: LoginRequest): Promise<BffLoginResponse> => {
  return bffFetch<BffLoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * 로그아웃 API (BFF)
 *
 * @returns 로그아웃 API 응답 Promise
 */
export const logout = (): Promise<LogoutResponse> => {
  return bffFetch<LogoutResponse>('/auth/logout', {
    method: 'POST',
  });
};

/**
 * 토큰 재발급 API (BFF)
 *
 * @returns 토큰 재발급 API 응답 Promise
 */
export const refreshToken = () => {
  return bffFetch('/auth/tokens', {
    method: 'POST',
  });
};
