import { NextResponse } from 'next/server';
import { serverFetch } from '@/shared/apis/base/serverFetch';
import { SignUpWithOauthRequestBody } from '@/shared/types/oauth';
import { UserServiceResponseDto } from '@/shared/types/user';
import { isApiError } from '@/shared/utils/errorGuards';
import { getJwtMaxAge } from '@/shared/utils/getJwtMaxAge';

type SignUpWithOauthResponse = {
  user: UserServiceResponseDto;
  refreshToken: string;
  accessToken: string;
};

type ApiErrorResponse = { message: string };

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
} as const;

export async function POST(
  request: Request
): Promise<NextResponse<UserServiceResponseDto | ApiErrorResponse>> {
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
    const signUpResponse = await serverFetch<SignUpWithOauthResponse>('/oauth/sign-up/kakao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const { accessToken, refreshToken, user } = signUpResponse;

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
