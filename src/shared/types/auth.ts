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

export interface CreateUserBodyDto {
  email: string;
  nickname: string;
  password: string;
}

export interface UpdateUserBodyDto {
  nickname?: string;
  profileImageUrl?: string | null;
  newPassword?: string;
}
