import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserServiceResponseDto } from '@/shared/types/user';

/**
 * ### UserStore
 *
 * @description
 * - 로그인한 사용자 정보를 전역으로 관리하기 위한 zustand store입니다.
 * - 서버로부터 전달받은 사용자 정보를 저장하며,
 *   인증 여부는 `user`의 존재 여부로 판단합니다.
 *
 * @remarks
 * - 로그인, `/users/me` 조회, 프로필 수정 등
 *   **서버에서 최신 사용자 정보를 받은 시점에만** `setUser`를 호출해야 합니다.
 * - 로그아웃 시에는 `clearUser`를 호출하여 사용자 정보를 초기화합니다.
 */
type UserStore = {
  user: UserServiceResponseDto | undefined;
  setUser: (user: UserServiceResponseDto) => void;
  clearUser: () => void;
};

/**
 * ### useUserStore
 *
 * @description
 * - 사용자 인증 상태를 전역으로 관리하는 zustand hook입니다.
 * - Redux DevTools와 연동되어 상태 변경을 추적할 수 있습니다.
 *
 * @example
 * ```ts
 * const user = useUserStore((state) => state.user);
 * const setUser = useUserStore((state) => state.setUser);
 * ```
 */
export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      user: undefined,
      setUser: (user) => set({ user }, false, 'user/setUser'),
      clearUser: () => set({ user: undefined }, false, 'user/clearUser'),
    }),
    {
      name: 'UserStore',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);
