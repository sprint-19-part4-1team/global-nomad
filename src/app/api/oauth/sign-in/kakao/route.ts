import { NextResponse } from 'next/server';
import { serverFetch } from '@/shared/apis/base/serverFetch';
import { SignInWithOauthRequestBody } from '@/shared/types/oauth';
import { UserServiceResponseDto } from '@/shared/types/user';
import { isApiError } from '@/shared/utils/errorGuards';
import { getJwtMaxAge } from '@/shared/utils/getJwtMaxAge';

type SignInWithOauthResponse = {
  user: UserServiceResponseDto;
  accessToken: string;
  refreshToken: string;
};

type ApiErrorResponse = { message: string };

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
} as const;

/**
 * Kakao OAuth 로그인 요청을 처리합니다.
 *
 * @description
 * - 클라이언트로부터 전달된 인가 코드를 기반으로 백엔드 로그인 API를 호출.
 * - 로그인 성공 시 accessToken, refreshToken을 httpOnly 쿠키로 설정.
 * - 실패 시 에러 메시지를 JSON 형태로 반환.
 *
 * @param request Request 객체.
 * @returns 사용자 정보 또는 에러 메시지를 포함한 NextResponse.
 */
export async function POST(
  request: Request
): Promise<NextResponse<UserServiceResponseDto | ApiErrorResponse>> {
  const redirectUri = process.env.KAKAO_REDIRECT_URI;
  if (!redirectUri) {
    return NextResponse.json(
      { message: 'KAKAO_REDIRECT_URI 환경 변수가 설정되지 않았습니다.' },
      { status: 500 }
    );
  }

  let body: SignInWithOauthRequestBody;
  try {
    body = (await request.json()) as SignInWithOauthRequestBody;
  } catch {
    return NextResponse.json({ message: '요청 본문이 올바르지 않습니다.' }, { status: 400 });
  }

  const token = typeof body.token === 'string' ? body.token : '';
  if (!token) {
    return NextResponse.json({ message: 'token이 필요합니다.' }, { status: 400 });
  }

  const payload: SignInWithOauthRequestBody = {
    token,
    redirectUri: redirectUri,
  };

  try {
    const signInResponse = await serverFetch<SignInWithOauthResponse>('/oauth/sign-in/kakao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const { accessToken, refreshToken, user } = signInResponse;

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

    return NextResponse.json({ message: '카카오 로그인에 실패했습니다.' }, { status: 500 });
  }
}
