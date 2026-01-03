import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AUTH_COOKIE_KEYS, COOKIE_OPTIONS } from '@/shared/constants';
import { getJwtMaxAge } from '@/shared/utils/jwt';

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

interface SetAuthCookiesOptions {
  response: NextResponse;
  accessToken: string;
  refreshToken: string;
}

/**
 * ## setAuthCookies
 *
 * @description
 * 인증 과정에서 발급받은 access / refresh token을 HttpOnly Cookie로 설정하는 유틸 함수
 *
 * @param response - 쿠키를 설정할 `NextResponse` 객체
 * @param accessToken - 백엔드 인증 서버로부터 발급받은 access token
 * @param refreshToken - 백엔드 인증 서버로부터 발급받은 refresh token
 */
export const setAuthCookies = ({
  response,
  accessToken,
  refreshToken,
}: SetAuthCookiesOptions): void => {
  response.cookies.set(AUTH_COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: getJwtMaxAge(accessToken),
  });

  response.cookies.set(AUTH_COOKIE_KEYS.REFRESH_TOKEN, refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: getJwtMaxAge(refreshToken),
  });
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
