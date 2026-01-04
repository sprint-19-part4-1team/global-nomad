import { NextResponse } from 'next/server';
import { AUTH_COOKIE_KEYS, COMMON_MESSAGE } from '@/shared/constants';
import { getAuthCookies } from '@/shared/utils/authCookies';
import { isApiError } from '@/shared/utils/errorGuards';

/**
 * 인증이 필요한 Route Handler에서 handler로 전달되는 컨텍스트 타입
 *
 * @template TBody - 요청 body의 타입 (JSON, FormData 등)
 * @property accessToken - 인증된 사용자의 access token
 * @property body - HTTP 요청 body (GET/DELETE에서는 undefined)
 * @property request - 원본 Request 객체
 */
type HandlerContext<TBody = unknown> = {
  accessToken: string;
  body?: TBody;
  request: Request;
};

/**
 * ## createAuthorizedRoute
 *
 * @description
 * 인증이 필요한 Next.js Route Handler를 생성하는 고차 함수입니다.
 * - 인증 토큰(accessToken) 존재 여부를 검사합니다.
 * - HTTP 메서드에 따라 요청 body를 안전하게 파싱합니다.
 *   - `GET`, `DELETE` → body 파싱하지 않음
 *   - 그 외 메서드
 *     - `multipart/form-data` → `request.formData()`
 *     - 그 외 → `request.json()`
 * - handler 실행 중 발생한 에러를 HTTP Response로 변환합니다.
 *
 * @template TBody - handler에서 사용할 요청 body 타입
 * @param handler - 인증 및 body 파싱이 완료된 후 실행될 함수 (`accessToken`, `body`, `request`를 전달)
 * @returns - Next.js Route Handler 함수
 *
 * @example
 * ```ts
 * export const GET = createAuthorizedRoute(async ({ accessToken }) => {
 *   return proxy('/users/me', { method: 'GET' }, accessToken);
 * });
 *
 * export const PATCH = createAuthorizedRoute<UpdateUserBody>(async ({ accessToken, body }) => {
 *   return proxy('/users/me', { method: 'PATCH', body }, accessToken);
 * });
 * ```
 */
export const createAuthorizedRoute = <TBody = unknown>(
  handler: (ctx: HandlerContext<TBody>) => Promise<unknown>
) => {
  return async (request: Request) => {
    const accessToken = await getAuthCookies(AUTH_COOKIE_KEYS.ACCESS_TOKEN);

    if (!accessToken) {
      return NextResponse.json({ message: COMMON_MESSAGE.TOKEN_ERROR }, { status: 401 });
    }

    try {
      let body: unknown;

      if (request.method !== 'GET' && request.method !== 'DELETE') {
        const contentType = request.headers.get('content-type') ?? '';

        if (contentType.includes('multipart/form-data')) {
          body = await request.formData();
        } else if (contentType.includes('application/json')) {
          // body가 비어있을 때 undefined를 처리하기 위해 추가
          const text = await request.text();
          body = text ? JSON.parse(text) : undefined;
        } else {
          body = undefined;
        }
      }

      const result = await handler({
        accessToken,
        body: body as TBody,
        request,
      });

      return NextResponse.json(result);
    } catch (err) {
      if (isApiError(err)) {
        return NextResponse.json({ message: err.message }, { status: err.status });
      }

      return NextResponse.json({ message: COMMON_MESSAGE.NETWORK_ERROR }, { status: 500 });
    }
  };
};
