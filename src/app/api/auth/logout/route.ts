import { NextResponse } from 'next/server';
import { clearAuthTokens } from '@/shared/utils/authCookies';

type LogoutResponseBody = {
  message: string;
};

/**
 * ## 로그아웃 API (BFF)
 *
 * @description
 * - 인증된 사용자의 로그아웃을 처리하는 API입니다.
 * - 서버에서 HttpOnly Cookie에 저장된 인증 토큰(accessToken, refreshToken)을 삭제합니다.
 *
 * @returns
 * - 200: 로그아웃 성공
 * - 500: 로그아웃 처리 중 서버 오류 발생
 *
 * @example
 * ```http
 * POST /api/auth/logout
 *
 * Response 200
 * {
 *   "message": "로그아웃 되었습니다."
 * }
 * ```
 */
export async function POST(): Promise<NextResponse<LogoutResponseBody>> {
  try {
    await clearAuthTokens();

    return NextResponse.json({ message: '로그아웃 되었습니다.' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return NextResponse.json({ message: '로그아웃에 실패했습니다.' }, { status: 500 });
  }
}
