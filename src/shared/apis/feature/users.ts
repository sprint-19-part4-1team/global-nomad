import { baseFetcher } from '@/shared/apis/base/baseFetcher';
import type { CreateUserBodyDto, UpdateUserBodyDto } from '@/shared/types/auth.types';

// 회원가입
export const signUp = (data: CreateUserBodyDto) => {
  return baseFetcher(`/users`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// 내 정보 조회
export const getMyInfo = () => {
  return baseFetcher(`/users/me`, { method: 'GET' });
};

// 내 정보 수정
export const updateMyInfo = (data: UpdateUserBodyDto) => {
  return baseFetcher(`/users/me`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// 프로필 이미지 url 생성
export const createProfileImageUrl = (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  return baseFetcher(`/users/me/image`, {
    method: 'POST',
    body: formData,
  });
};
