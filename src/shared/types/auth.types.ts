export interface LoginRequest {
  email: string;
  password: string;
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
