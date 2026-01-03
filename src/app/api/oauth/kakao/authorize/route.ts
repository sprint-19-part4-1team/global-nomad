import { NextResponse } from 'next/server';

const KAKAO_OAUTH_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';

type OAuthMode = 'signin' | 'signup';

const DEFAULT_OAUTH_MODE: OAuthMode = 'signin';

const isOAuthMode = (value: string | null): value is OAuthMode =>
  value === 'signin' || value === 'signup';

export async function GET(request: Request) {
  const url = new URL(request.url);

  const oauthModeParam = url.searchParams.get('mode');
  const oauthMode: OAuthMode = isOAuthMode(oauthModeParam) ? oauthModeParam : DEFAULT_OAUTH_MODE;

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

  const authorizeUrl = new URL(KAKAO_OAUTH_AUTHORIZE_URL);

  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('state', oauthMode);

  return NextResponse.redirect(authorizeUrl.toString());
}
