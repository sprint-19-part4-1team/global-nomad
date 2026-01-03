import { NextResponse } from 'next/server';
import { serverFetch } from '@/shared/apis/base/serverFetch';
import { SignInWithOauthRequestBody } from '@/shared/types/oauth';
import { UserServiceResponseDto } from '@/shared/types/user';
import { isApiError } from '@/shared/utils/errorGuards';
import { getJwtMaxAge } from '@/shared/utils/getJwtMaxAge';

type SignInResponse = {
  user: UserServiceResponseDto;
  accessToken: string;
  refreshToken: string;
};

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
} as const;

export async function POST(request: Request) {
  const body = (await request.json()) as SignInWithOauthRequestBody;
  const redirectUri = process.env.KAKAO_REDIRECT_URI;

  if (!redirectUri) {
    return NextResponse.json(
      { message: 'KAKAO_REDIRECT_URI 환경 변수가 설정되지 않았습니다.' },
      { status: 500 }
    );
  }
  const payload: SignInWithOauthRequestBody = {
    ...body,
    redirectUri,
  };

  try {
    const data = await serverFetch<SignInResponse>(`/oauth/sign-in/kakao`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const { accessToken, refreshToken, user } = data;

    const response = NextResponse.json(user ?? { ok: true });

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

    return NextResponse.json({ message: '카카오 로그인에 실패했습니다.' }, { status: 500 });
  }
}
