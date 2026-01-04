import { NextResponse } from 'next/server';
import type { UserServiceResponseDto } from '@/shared/types/user';
import { getJwtMaxAge } from '@/shared/utils/jwt';

export type OAuthSessionResponseBody = {
  user: UserServiceResponseDto;
  accessTokenExpiresAt: number;
};

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
} as const;

export const createOAuthSessionResponse = (params: {
  user: UserServiceResponseDto;
  accessToken: string;
  refreshToken: string;
}): NextResponse<OAuthSessionResponseBody> => {
  const { user, accessToken, refreshToken } = params;

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
};

export const getRequiredKakaoRedirectUri = (): string => {
  const redirectUri = process.env.KAKAO_REDIRECT_URI;
  if (!redirectUri) {
    throw new Error('KAKAO_REDIRECT_URI_NOT_SET');
  }
  return redirectUri;
};
