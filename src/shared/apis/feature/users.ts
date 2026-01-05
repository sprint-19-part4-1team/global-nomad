import { bffFetch } from '@/shared/apis/base/bffFetch';
import { publicFetch } from '@/shared/apis/base/publicFetch';
import type {
  CreateProfileImageUrlResponse,
  UserServiceResponseDto,
  CreateUserBodyDto,
  UpdateUserBodyDto,
} from '@/shared/types/user';

/**
 * 회원가입 요청 API
 *
 * @param data - 회원가입에 필요한 사용자 정보
 * @returns 회원가입 API 응답 Promise
 */
export const signUp = (data: CreateUserBodyDto): Promise<UserServiceResponseDto> => {
  return publicFetch<UserServiceResponseDto>(`/users`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * 로그인한 사용자의 내 정보 조회 API (BFF)
 *
 * @returns 내 정보 조회 API 응답 Promise
 */
export const getMyInfo = (): Promise<UserServiceResponseDto> => {
  return bffFetch<UserServiceResponseDto>(`/users/me`, { method: 'GET' });
};

/**
 * 로그인한 사용자의 내 정보 수정 API (BFF)
 *
 * @param data - 수정할 사용자 정보
 * @returns 내 정보 수정 API 응답 Promise
 */
export const updateMyInfo = (data: UpdateUserBodyDto): Promise<UserServiceResponseDto> => {
  return bffFetch<UserServiceResponseDto>(`/users/me`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

/**
 * 프로필 이미지 업로드를 위한 이미지 URL 생성 API (BFF)
 *
 * @param image - 업로드할 프로필 이미지 파일
 * @returns 프로필 이미지 URL 생성 API 응답 Promise
 */
export const createProfileImageUrl = (image: File): Promise<CreateProfileImageUrlResponse> => {
  const formData = new FormData();
  formData.append('image', image);

  return bffFetch<CreateProfileImageUrlResponse>(`/users/me/image`, {
    method: 'POST',
    body: formData,
  });
};
