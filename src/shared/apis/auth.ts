import { baseFetcher } from '@/shared/apis/baseFetcher';

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponseDto {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
  refreshToken: string;
  accessToken: string;
}
export interface RefreshTokenResponseDto {
  refreshToken: string;
  accessToken: string;
}

export type LoginResponse = Pick<LoginResponseDto, 'accessToken' | 'user'>;
export type RefreshTokenResponse = Pick<RefreshTokenResponseDto, 'accessToken'>;

export const logIn = (data: LoginRequest) => {
  return baseFetcher<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const refreshToken = () => {
  return baseFetcher<RefreshTokenResponse>('/auth/tokens', {
    method: 'POST',
  });
};
