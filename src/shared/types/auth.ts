import { UserServiceResponseDto } from '@/shared/types/user';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserServiceResponseDto;
}

export interface LogoutResponse {
  message: string;
}
