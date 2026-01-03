'use client';

import { useEffect, useRef } from 'react';
import { refreshToken } from '@/shared/apis/feature/auth';
import { useUserStore } from '@/shared/stores/userStore';

const REFRESH_BEFORE_MS = 5 * 60 * 1000;

/**
 * ## useTokenRefresh
 *
 * @description
 * - accessToken의 만료 시각을 기준으로 만료 5분 전에 refreshToken API를 호출하는 전역 훅입니다.
 * - 로그인 상태이며, accessToken 만료 시각이 존재할 때만 동작합니다.
 *
 * @behavior
 * - accessToken 만료 5분 전 시점에 `refreshToken()`을 자동 호출합니다.
 * - refresh 성공 시:
 *   - 서버로부터 전달받은 새로운 `accessTokenExpiresAt`으로 세션 정보를 갱신합니다.
 * - refresh 실패 시:
 *   - refreshToken 만료 또는 인증 실패로 간주하고 세션을 초기화합니다(`clearSession`).
 */
export default function useTokenRefresh() {
  const timerRef = useRef<number | null>(null);
  const isRefreshingRef = useRef(false);
  const { accessTokenExpiresAt, user, setSession, clearSession } = useUserStore();

  useEffect(() => {
    if (!user || !accessTokenExpiresAt) {
      return;
    }

    const now = Date.now();
    const refreshAt = accessTokenExpiresAt - REFRESH_BEFORE_MS;
    const delay = refreshAt - now;

    const runRefresh = async () => {
      if (isRefreshingRef.current) {
        return;
      }

      isRefreshingRef.current = true;

      try {
        const res = await refreshToken();

        setSession({
          user,
          accessTokenExpiresAt: res.accessTokenExpiresAt,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('리프레시 토큰 갱신 실패:', error);
        clearSession('expired');
      } finally {
        isRefreshingRef.current = false;
      }
    };

    if (delay <= 0) {
      runRefresh();
      return;
    }

    timerRef.current = window.setTimeout(() => {
      runRefresh();
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [accessTokenExpiresAt, user, setSession, clearSession]);
}
