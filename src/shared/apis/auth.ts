import { baseFetcher } from '@/shared/apis/baseFetcher';

export interface LoginRequest {
  email: string;
  password: string;
}

export const logIn = (data: LoginRequest) => {
  return baseFetcher('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const refreshToken = () => {
  return baseFetcher('/auth/tokens', {
    method: 'POST',
  });
};
