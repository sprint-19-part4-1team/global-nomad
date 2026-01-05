/**
 * 사용자 정보 타입
 * @description API 응답으로 받는 사용자 데이터 구조
 */
export interface UserServiceResponseDto {
  /** 사용자 고유 ID */
  id: number;
  /** 사용자 이메일 주소 */
  email: string;
  /** 사용자 닉네임 */
  nickname: string;
  /** 프로필 이미지 URL (없을 경우 null) */
  profileImageUrl: string | null;
  /** 계정 생성 일시 (ISO 8601 형식) */
  createdAt: string;
  /** 계정 최종 수정 일시 (ISO 8601 형식) */
  updatedAt: string;
}

export interface CreateUserBodyDto {
  email: string;
  nickname: string;
  password: string;
}

/**
 * 유저 정보 수정 요청 body 타입
 *
 * @description 마이페이지에서 유저의 기본 정보를 수정할 때 사용하는 요청 body 타입
 */
export interface UpdateUserBodyDto {
  /** 변경할 닉네임 */
  nickname?: string;
  /** 변경할 프로필 이미지 URL (없을 경우 null) */
  profileImageUrl?: string | null;
  /** 변경할 닉네임 */
  newPassword?: string;
}

export interface CreateProfileImageUrlResponse {
  profileImageUrl: string;
}
