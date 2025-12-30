import { baseFetcher } from '@/shared/apis/base/baseFetcher';
import type { LoginRequest } from '@/shared/types/auth.types';

// 로그인
export const logIn = (data: LoginRequest) => {
  return baseFetcher('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// 토큰 재발급
export const refreshToken = () => {
  return baseFetcher('/auth/tokens', {
    method: 'POST',
  });
};
