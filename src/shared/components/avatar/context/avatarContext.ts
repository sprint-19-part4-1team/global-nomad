import { createContext, Dispatch, SetStateAction } from 'react';
import { UserServiceResponseDto } from '@/shared/types/user';

/**
 * Avatar 컴포넌트 Context 타입
 * @property {User} user - 사용자 정보
 * @property {Dispatch<SetStateAction<boolean>>} setImageError - 이미지 로딩 에러 상태 설정 함수
 */
interface AvatarContextType {
  user: UserServiceResponseDto;
  imageError: boolean;
  setImageError: Dispatch<SetStateAction<boolean>>;
}

/**
 * Avatar 컴포넌트의 Context
 * @description Avatar 컴포넌트와 하위 컴포넌트(Image, Fallback) 간 상태를 공유
 */
export const AvatarContext = createContext<AvatarContextType | undefined>(undefined);
