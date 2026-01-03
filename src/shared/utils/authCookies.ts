import { cookies } from 'next/headers';
import { AUTH_COOKIE_KEYS } from '@/shared/constants';

type AuthToken = 'accessToken' | 'refreshToken';

/**
 * ## getAuthCookies
 *
 * @description
 * next cookies를 사용해서 쿠키에 저장된 토큰을 가져오는 함수
 *
 * @returns {Promise<string | undefined>} - 토큰 문자열 / undefined
 */
export const getAuthCookies = async (token: AuthToken): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(token)?.value;
};

/**
 * ## clearAuthCookies
 *
 * @description
 * next cookies를 사용해서 쿠키에 저장된 토큰을 삭제하는 함수
 */
export const clearAuthCookies = async (): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: AUTH_COOKIE_KEYS.ACCESS_TOKEN,
    value: '',
    path: '/',
    maxAge: 0,
  });

  cookieStore.set({
    name: AUTH_COOKIE_KEYS.REFRESH_TOKEN,
    value: '',
    path: '/',
    maxAge: 0,
  });
};
