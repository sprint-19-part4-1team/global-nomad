import { NextResponse } from 'next/server';
import { COOKIE_OPTIONS } from '@/shared/constants';
import type { UserServiceResponseDto } from '@/shared/types/user';
import { setAuthCookies } from '@/shared/utils/authCookies';
import { getJwtMaxAge, getJwtExpiresAt } from '@/shared/utils/jwt';

export type OAuthSessionResponseBody = {
  user: UserServiceResponseDto;
  accessTokenExpiresAt: number;
};

export const createOAuthSessionResponse = (params: {
  user: UserServiceResponseDto;
  accessToken: string;
  refreshToken: string;
}): NextResponse<OAuthSessionResponseBody> => {
  const { user, accessToken, refreshToken } = params;

  const accessTokenExpiresAt = getJwtExpiresAt(accessToken);

  const response = NextResponse.json({ user, accessTokenExpiresAt });

  setAuthCookies({ response, accessToken, refreshToken });

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
