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

export interface UpdateUserBodyDto {
  nickname?: string;
  profileImageUrl?: string | null;
  newPassword?: string;
}
