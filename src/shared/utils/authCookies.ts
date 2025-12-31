import { cookies } from 'next/headers';

type AuthToken = 'accessToken' | 'refreshToken';

/**
 * ## getAuthToken
 *
 * @description
 * next cookies를 사용해서 쿠키에 저장된 토큰을 가져오는 함수
 *
 * @returns {Promise<string | undefined>} - 토큰 문자열 / undefined
 */
export const getAuthToken = async (token: AuthToken): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(token)?.value;
};

/**
 * ## clearAuthTokens
 *
 * @description
 * next cookies를 사용해서 쿠키에 저장된 토큰을 삭제하는 함수
 */
export const clearAuthTokens = async () => {
  const cookieStore = await cookies();

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
};
