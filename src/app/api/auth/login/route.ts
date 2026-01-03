import { NextResponse } from 'next/server';
import { serverFetch } from '@/shared/apis/base/serverFetch';
import { AUTH_API_MESSAGE, AUTH_COOKIE_KEYS, COOKIE_OPTIONS } from '@/shared/constants';
import { LoginResponse } from '@/shared/types/auth';
import { UserServiceResponseDto } from '@/shared/types/user';
import { isApiError } from '@/shared/utils/errorGuards';
import { getJwtMaxAge } from '@/shared/utils/getJwtMaxAge';

type LoginResponseBody = UserServiceResponseDto | { message: string };

/**
 * 로그인 API (BFF)
 *
 * @description
 * - 클라이언트에서 전달받은 로그인 정보를 백엔드 인증 API로 전달합니다.
 * - 백엔드로부터 전달받은 access / refresh token을 HttpOnly Cookie로 저장합니다.
 * - 클라이언트에는 토큰을 노출하지 않고, 필요한 유저 정보만 반환합니다.
 *
 *  @param request - 이메일과 비밀번호를 포함한 Request 객체
 *  @returns
 *  - 로그인 성공 시: 유저 정보가 포함된 JSON 응답
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

    // 유저 정보만 response로 리턴
    const response = NextResponse.json(user);

    // 토큰들은 쿠키에 저장
    response.cookies.set(AUTH_COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: getJwtMaxAge(accessToken), // 쿠키 만료 시간 설정
    });

    response.cookies.set(AUTH_COOKIE_KEYS.REFRESH_TOKEN, refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: getJwtMaxAge(refreshToken),
    });

    return response;
  } catch (err: unknown) {
    if (isApiError(err)) {
      return NextResponse.json({ message: err.message }, { status: err.status });
    }

    return NextResponse.json({ message: AUTH_API_MESSAGE.LOGIN.FAILED }, { status: 500 });
  }
}
