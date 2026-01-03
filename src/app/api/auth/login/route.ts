import { NextResponse } from 'next/server';
import { serverFetch } from '@/shared/apis/base/serverFetch';
import { AUTH_API_MESSAGE } from '@/shared/constants';
import { BffLoginResponse, LoginResponse } from '@/shared/types/auth';
import { MessageResponse } from '@/shared/types/common';
import { setAuthCookies } from '@/shared/utils/authCookies';
import { isApiError } from '@/shared/utils/errorGuards';
import { getJwtExpiresAt } from '@/shared/utils/jwt';

type LoginResponseBody = BffLoginResponse | MessageResponse;

/**
 * 로그인 API (BFF)
 *
 * @description
 * - 클라이언트에서 전달받은 로그인 정보를 백엔드 인증 API로 전달합니다.
 * - 백엔드로부터 전달받은 access / refresh token을 HttpOnly Cookie로 저장합니다.
 * - 클라이언트에는 토큰을 노출하지 않고, 필요한 정보만 반환합니다.
 *
 *  @param request - 이메일과 비밀번호를 포함한 Request 객체
 *  @returns
 *  - 로그인 성공 시: 유저 정보, 엑세스 토큰 만료시간이 포함된 JSON 응답
 *  - 로그인 실패 시: 에러 메시지와 상태 코드 반환
 */
export async function POST(request: Request): Promise<NextResponse<LoginResponseBody>> {
  const { email, password } = await request.json();

  try {
    const data = await serverFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const { accessToken, refreshToken, user } = data;
    const accessTokenExpiresAt = getJwtExpiresAt(accessToken);

    const response = NextResponse.json({ user, accessTokenExpiresAt });

    setAuthCookies({ response, accessToken, refreshToken });

    return response;
  } catch (err: unknown) {
    if (isApiError(err)) {
      return NextResponse.json({ message: err.message }, { status: err.status });
    }

    return NextResponse.json({ message: AUTH_API_MESSAGE.LOGIN.FAILED }, { status: 500 });
  }
}
