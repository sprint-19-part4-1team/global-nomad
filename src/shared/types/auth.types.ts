import { User } from '@/shared/types/user.type';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
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
