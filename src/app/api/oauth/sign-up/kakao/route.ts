import { NextResponse } from 'next/server';
import { serverFetch } from '@/shared/apis/base/serverFetch';
import { SignUpWithOauthRequestBody } from '@/shared/types/oauth';
import { UserServiceResponseDto } from '@/shared/types/user';
import { isApiError } from '@/shared/utils/errorGuards';
import { getJwtMaxAge } from '@/shared/utils/getJwtMaxAge';

type SignUpResponse = {
  user: UserServiceResponseDto;
  refreshToken: string;
  accessToken: string;
};

type ErrorBody = { message: string };

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
} as const;

/**
 * OAuth 기반 간편 회원가입 API (BFF)
 *
 * @description
 * - 클라이언트에서 전달받은 OAuth 회원가입 정보를 백엔드 OAuth 회원가입 API로 전달합니다.
 * - 백엔드로부터 전달받은 access / refresh token을 HttpOnly Cookie로 저장합니다.
 * - 클라이언트에는 토큰을 노출하지 않고, 유저 정보만 반환합니다.
 */
export async function POST(
  request: Request
): Promise<NextResponse<UserServiceResponseDto | ErrorBody>> {
  const body = (await request.json()) as SignUpWithOauthRequestBody;

  try {
    const data = await serverFetch<SignUpResponse>('/oauth/sign-up/kakao', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const { accessToken, refreshToken, user } = data;

    const response = NextResponse.json(user);

    response.cookies.set('accessToken', accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: getJwtMaxAge(accessToken),
    });

    response.cookies.set('refreshToken', refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: getJwtMaxAge(refreshToken),
    });

    return response;
  } catch (err: unknown) {
    if (isApiError(err)) {
      return NextResponse.json({ message: err.message }, { status: err.status });
    }

    return NextResponse.json({ message: '카카오 회원가입에 실패했습니다.' }, { status: 500 });
  }
}
