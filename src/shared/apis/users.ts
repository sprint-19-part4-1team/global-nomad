import { baseFetcher } from '@/shared/apis/baseFetcher';

export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
}
export interface UserServiceResponseDto {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface UpdateUserBodyDto {
  nickname?: string;
  profileImageUrl?: string | null;
  newPassword?: string;
}
export interface CreateProfileImgUrlResponseDto {
  profileImageUrl: string;
}

// 회원가입
export const signUp = (data: SignUpRequest) => {
  return baseFetcher<UserServiceResponseDto>(`/users`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// 내 정보 조회
export const getMyInfo = () => {
  return baseFetcher<UserServiceResponseDto>(`/users/me`, { method: 'GET' });
};

// 내 정보 수정
export const updateMyInfo = (data: UpdateUserBodyDto) => {
  return baseFetcher<UserServiceResponseDto>(`/users/me`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// 프로필 이미지 url 생성
export const createProfileImageUrl = (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  return baseFetcher<CreateProfileImgUrlResponseDto>(`/users/me/image`, {
    method: 'POST',
    body: formData,
  });
};
