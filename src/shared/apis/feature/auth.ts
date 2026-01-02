import { bffFetch } from '@/shared/apis/base/bffFetch';
import { LoginResponse, type LoginRequest } from '@/shared/types/auth.types';

/**
 * 로그인 API (BFF)
 *
 * @param data - 로그인에 필요한 사용자 정보
 * @returns 로그인 API 응답 Promise
 */
export const login = (data: LoginRequest) => {
  return bffFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
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
