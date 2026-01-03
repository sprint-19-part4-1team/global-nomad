import { NextResponse } from 'next/server';
import { serverFetch } from '@/shared/apis/base/serverFetch';
import { SignUpWithOauthRequestBody } from '@/shared/types/oauth';
import { UserServiceResponseDto } from '@/shared/types/user';
import { isApiError } from '@/shared/utils/errorGuards';
import { getJwtMaxAge } from '@/shared/utils/jwt';

type OAuthSessionResponseBody = {
  user: UserServiceResponseDto;
  accessTokenExpiresAt: number;
};

type ApiErrorResponse = { message: string };

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
} as const;

/**
 * Kakao OAuth 회원가입(BFF) 요청을 처리한다.
 *
 * @description
 * - 클라이언트에서 전달한 인가 코드(token)와 nickname으로 백엔드 OAuth 회원가입 API를 호출한다.
 * - 회원가입 성공 시 accessToken/refreshToken을 HttpOnly 쿠키로 저장한다.
 * - 클라이언트에는 토큰을 노출하지 않고 `{ user, accessTokenExpiresAt }`만 반환한다.
 *
 * @param request `token`, `nickname`을 포함한 JSON 요청 본문을 가진 Request 객체.
 * @returns 성공 시 `{ user, accessTokenExpiresAt }`, 실패 시 `{ message }`를 반환한다.
 */
export async function POST(
  request: Request
): Promise<NextResponse<OAuthSessionResponseBody | ApiErrorResponse>> {
  const redirectUri = process.env.KAKAO_REDIRECT_URI;
  if (!redirectUri) {
    return NextResponse.json(
      { message: 'KAKAO_REDIRECT_URI가 설정되어 있지 않습니다.' },
      { status: 500 }
    );
  }

  let body: SignUpWithOauthRequestBody;
  try {
    body = (await request.json()) as SignUpWithOauthRequestBody;
  } catch {
    return NextResponse.json({ message: '요청 본문이 올바르지 않습니다.' }, { status: 400 });
  }

  const token = typeof body.token === 'string' ? body.token : '';
  const nickname = typeof body.nickname === 'string' ? body.nickname : '';

  if (!token) {
    return NextResponse.json({ message: 'token이 필요합니다.' }, { status: 400 });
  }
  if (!nickname) {
    return NextResponse.json({ message: 'nickname이 필요합니다.' }, { status: 400 });
  }

  const payload: SignUpWithOauthRequestBody = {
    token,
    nickname,
    redirectUri: redirectUri,
  };

  try {
    const signUpResponse = await serverFetch<{
      user: UserServiceResponseDto;
      refreshToken: string;
      accessToken: string;
    }>('/oauth/sign-up/kakao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const { accessToken, refreshToken, user } = signUpResponse;

    const accessTokenMaxAge = getJwtMaxAge(accessToken);
    const accessTokenExpiresAt = Date.now() + accessTokenMaxAge * 1000;

    const response = NextResponse.json({ user, accessTokenExpiresAt });

    response.cookies.set('accessToken', accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: accessTokenMaxAge,
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
