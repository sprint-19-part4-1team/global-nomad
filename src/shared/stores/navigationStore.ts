import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface NavigationState {
  /** 최근 방문한 URL 경로 목록 */
  urlHistory: string[];
  /** 현재 URL을 히스토리에 추가합니다. (중복 경로는 무시) */
  pushUrl: (url: string) => void;
  /**
   * 이전 페이지 URL을 반환합니다.
   *
   * @returns
   * - 히스토리가 2개 이상일 경우: 직전 URL
   * - 그렇지 않은 경우: `'/'`
   */
  getPreviousUrl: () => string;
}

/**
 * ## useNavigationStore
 *
 * @description
 * - 페이지 이동 히스토리를 sessionStorage에 저장하는 Zustand 스토어입니다.
 * - 새로고침 이후에도 최근 URL 기록을 유지합니다.
 *
 * @remarks
 * - 최대 3개의 URL만 유지하여 메모리 사용을 제한합니다.
 * - 내부 네비게이션 추적(`NavigationTracker`)과 함께 사용하는 것을 권장합니다.
 */
export const useNavigationStore = create<NavigationState>()(
  persist(
    (set, get) => ({
      urlHistory: [],

      pushUrl: (url: string) => {
        set((state) => {
          const history = state.urlHistory;
          const lastUrl = history[history.length - 1];

          if (lastUrl === url) {
            return state;
          }

          const newHistory = [...state.urlHistory, url].slice(-3);
          return { urlHistory: newHistory };
        });
      },

      getPreviousUrl: () => {
        const history = get().urlHistory;
        return history.length >= 2 ? history[history.length - 2] : '/';
      },
    }),
    {
      name: 'navigation-history',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
