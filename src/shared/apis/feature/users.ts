import { baseFetcher } from '@/shared/apis/base/baseFetcher';
import type { CreateUserBodyDto, UpdateUserBodyDto } from '@/shared/types/auth.types';

/**
 * 회원가입 요청 API
 *
 * @param data - 회원가입에 필요한 사용자 정보
 * @returns 회원가입 API 응답 Promise
 */
export const signUp = (data: CreateUserBodyDto) => {
  return baseFetcher(`/users`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * 로그인한 사용자의 내 정보 조회 API
 *
 * @returns 내 정보 조회 API 응답 Promise
 */
export const getMyInfo = () => {
  return baseFetcher(`/users/me`, { method: 'GET' });
};

/**
 * 로그인한 사용자의 내 정보 수정 API
 *
 * @param data - 수정할 사용자 정보
 * @returns 내 정보 수정 API 응답 Promise
 */
export const updateMyInfo = (data: UpdateUserBodyDto) => {
  return baseFetcher(`/users/me`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

/**
 * 프로필 이미지 업로드를 위한 이미지 URL 생성 API
 *
 * @param image - 업로드할 프로필 이미지 파일
 * @returns 프로필 이미지 URL 생성 API 응답 Promise
 */
export const createProfileImageUrl = (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  return baseFetcher(`/users/me/image`, {
    method: 'POST',
    body: formData,
  });
};
