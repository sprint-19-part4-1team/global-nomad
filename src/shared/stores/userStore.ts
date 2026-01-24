import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserServiceResponseDto } from '@/shared/types/user';

/**
 * ## LogoutReason
 *
 * @description
 * - 로그아웃이 발생한 원인을 구분하기 위한 타입입니다.
 *
 * @property 'user' - 사용자가 로그아웃 버튼 클릭 등 명시적인 행동으로 로그아웃한 경우
 * @property 'expired' - refreshToken 만료 등으로 인해 세션이 자동으로 종료된 경우
 */
type LogoutReason = 'user' | 'expired';

/**
 * ### UserStore
 *
 * @description
 * - 로그인한 사용자 및 인증 세션 정보를 전역으로 관리하는 zustand store입니다.
 * - 사용자 정보와 accessToken 만료 시각을 기준으로 인증 상태를 판단합니다.
 *
 * @remarks
 * - 로그인, `/users/me` 조회, 프로필 수정 등 **서버에서 최신 사용자 정보를 받은 시점에만** `setUser` 또는 `setSession`를 호출해야 합니다.
 * - 로그아웃 또는 세션 만료 시 `clearSession`를 호출하여 인증 상태를 초기화합니다.
 * - 이 store는 `zustand/persist`를 사용하여 새로고침 후에도 사용자 정보를 복원합니다.
 */
type UserStore = {
  /** 로그인한 사용자 정보 (비로그인 시 undefined) */
  user: UserServiceResponseDto | undefined;
  /** accessToken 만료 시각 (ms timestamp) */
  accessTokenExpiresAt: number | undefined;
  /** 세션 종료 원인 수동 로그아웃(`user`) 또는 자동 로그아웃(`expired`) */
  logoutReason: LogoutReason | undefined;
  /** persist hydration 완료 여부 (SSR → CSR 깜빡임 방지용) */
  hasHydrated: boolean;
  /** 인증 상태 변경(로그인/로그아웃)에 따른 페이지 전환이 진행 중인지 여부 */
  isAuthInProgress: boolean;
  /** OAuth 인증 실패 시 표시할 에러 메시지 */
  oauthError: string | null;
  /** 인증 상태 변경(로그인/로그아웃)에 따른 페이지 전환 설정 */
  setIsAuthInProgress: (isAuthTransitioning: boolean) => void;
  /** 사용자 정보 설정 */
  setUser: (user: UserServiceResponseDto) => void;
  /** 사용자 정보와 accessToken 만료 시각을 함께 설정 (로그인, 토큰 만료) */
  setSession: (params: { user: UserServiceResponseDto; accessTokenExpiresAt: number }) => void;
  /** 인증 세션을 종료하고 사용자 정보를 초기화 */
  clearSession: (reason: LogoutReason) => void;
  /** OAuth 에러 메시지 설정 */
  setOAuthError: (message: string) => void;
  /** OAuth 에러 메시지 초기화 */
  clearOAuthError: () => void;
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
    persist(
      (set) => ({
        user: undefined,
        accessTokenExpiresAt: undefined,
        logoutReason: undefined,
        hasHydrated: false,
        isAuthInProgress: false,
        oauthError: null,
        setIsAuthInProgress: (value: boolean) =>
          set({ isAuthInProgress: value }, false, 'user/setIsAuthInProgress'),
        setUser: (user) => set({ user }, false, 'user/setUser'),
        setOAuthError: (message) => set({ oauthError: message }, false, 'user/setOAuthError'),
        clearOAuthError: () => set({ oauthError: null }, false, 'user/clearOAuthError'),
        setSession: ({ user, accessTokenExpiresAt }) =>
          set(
            {
              user,
              accessTokenExpiresAt,
              logoutReason: undefined,
            },
            false,
            'user/setSession'
          ),
        clearSession: (reason) =>
          set(
            { user: undefined, accessTokenExpiresAt: undefined, logoutReason: reason },
            false,
            'user/clearSession'
          ),
      }),
      {
        name: 'user',
        partialize: (state) => ({
          user: state.user,
          accessTokenExpiresAt: state.accessTokenExpiresAt,
        }),
        onRehydrateStorage: (state) => {
          if (state) {
            state.hasHydrated = true;
          }
        },
      }
    ),
    { enabled: process.env.NODE_ENV === 'development' }
  )
);
