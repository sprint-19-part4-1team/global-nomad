import { bffFetch } from '@/shared/apis/base/bffFetch';
import type { LoginRequest } from '@/shared/types/auth';
import type { MessageResponse } from '@/shared/types/common';
import type { UserServiceResponseDto } from '@/shared/types/user';

/**
 * 로그인 API (BFF)
 *
 * @param data - 로그인에 필요한 사용자 정보
 * @returns 로그인 API 응답 Promise
 */
export const login = (data: LoginRequest): Promise<UserServiceResponseDto> => {
  return bffFetch<UserServiceResponseDto>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * 로그아웃 API (BFF)
 *
 * @returns 로그아웃 API 응답 Promise
 */
export const logout = (): Promise<MessageResponse> => {
  return bffFetch<MessageResponse>('/auth/logout', {
    method: 'POST',
  });
};

/**
 * 토큰 재발급 API (BFF)
 *
 * @returns 토큰 재발급 API 응답 Promise
 */
export const refreshToken = (): Promise<MessageResponse> => {
  return bffFetch<MessageResponse>('/auth/tokens', {
    method: 'POST',
  });
};
