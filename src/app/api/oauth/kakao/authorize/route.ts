import { NextResponse } from 'next/server';

const KAKAO_AUTH_BASE_URL = 'https://kauth.kakao.com/oauth/authorize';

type Mode = 'signin' | 'signup';

const isMode = (value: string | null): value is Mode => value === 'signin' || value === 'signup';

export async function GET(request: Request) {
  const url = new URL(request.url);

  const modeParam = url.searchParams.get('mode');
  const mode: Mode = isMode(modeParam) ? modeParam : 'signin';

  const clientId = process.env.KAKAO_REST_API_KEY;
  const redirectUri = process.env.KAKAO_REDIRECT_URI;

  if (!clientId) {
    return NextResponse.json(
      { message: 'KAKAO_REST_API_KEY 환경 변수가 설정되지 않았습니다.' },
      { status: 500 }
    );
  }

  if (!redirectUri) {
    return NextResponse.json(
      { message: 'KAKAO_REDIRECT_URI 환경 변수가 설정되지 않았습니다.' },
      { status: 500 }
    );
  }

  // state는 우리가 넣고, 카카오가 콜백에 그대로 되돌려줌
  // 로그인/회원가입 의도를 전달하는 용도로 사용
  const authorizeUrl = new URL(KAKAO_AUTH_BASE_URL);
  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('state', mode);

  // 카카오 로그인 화면으로 리다이렉트
  return NextResponse.redirect(authorizeUrl.toString());
}
