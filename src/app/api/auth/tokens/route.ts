import { NextResponse } from 'next/server';
import { serverFetch } from '@/shared/apis/base/serverFetch';
import { AUTH_API_MESSAGE } from '@/shared/constants';
import { TokensResponse } from '@/shared/types/auth';
import { MessageResponse } from '@/shared/types/common';
import { setAuthCookies } from '@/shared/utils/authCookies';
import { isApiError } from '@/shared/utils/errorGuards';

/**
 * 리프레시 토큰 갱신 API (BFF)
 *
 * @description
 * - 백엔드 인증 서버(`/auth/tokens`)에 요청하여
 *   새로운 access / refresh token을 발급받습니다.
 * - 발급받은 토큰은 HttpOnly Cookie로 저장하여
 *   클라이언트에 토큰을 직접 노출하지 않습니다.
 * - 클라이언트에는 토큰 갱신 결과에 대한 메시지만 반환합니다.
 *
 * @returns
 * - 성공 시: 토큰 갱신 성공 메시지(JSON)
 * - 실패 시: 에러 메시지와 HTTP 상태 코드(JSON)
 */
export async function POST(): Promise<NextResponse<MessageResponse>> {
  try {
    const data = await serverFetch<TokensResponse>('/auth/tokens', {
      method: 'POST',
    });

    const { accessToken, refreshToken } = data;
    const response = NextResponse.json({ message: AUTH_API_MESSAGE.TOKEN.REFRESH_SUCCESS });

    setAuthCookies({ response, accessToken, refreshToken });

    return response;
  } catch (err: unknown) {
    if (isApiError(err)) {
      return NextResponse.json({ message: err.message }, { status: err.status });
    }

    return NextResponse.json({ message: AUTH_API_MESSAGE.TOKEN.REFRESH_FAILED }, { status: 500 });
  }
}
