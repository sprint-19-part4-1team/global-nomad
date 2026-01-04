import { serverFetch } from '@/shared/apis/base/serverFetch';

/**
 * proxy에 전달되는 옵션 타입입니다.
 *
 * @template TBody - 요청 body의 타입
 *
 * @remarks
 * - `RequestInit.body`는 네트워크 전송용 타입(`BodyInit`)만 허용하지만,
 *   BFF에서는 DTO(JSON 객체 등)를 그대로 다루기 위해 body 타입을 제네릭으로 분리합니다.
 * - 실제 전송 타입(`BodyInit`)으로의 변환은 proxy 내부에서 수행됩니다.
 */
type ProxyOptions<TBody> = Omit<RequestInit, 'body'> & {
  body?: TBody;
};

/**
 * ## proxy
 *
 * @description
 * BFF(Route Handler)에서 백엔드 API로 요청을 전달하기 위한 공통 프록시 함수입니다.
 *
 * - Authorization 헤더를 자동으로 주입합니다.
 * - 요청 body를 네트워크 전송 가능한 타입(`BodyInit`)으로 변환합니다.
 *   - JSON 객체 → `JSON.stringify`
 *   - `FormData`, `string` 등 → 그대로 전달
 * - 실제 HTTP 요청은 `serverFetch`에 위임합니다.
 *
 * @template TResponse - 백엔드 API 응답 타입
 * @template TBody - 요청 body의 타입
 *
 * @param endpoint - 호출할 백엔드 API 엔드포인트
 * @param options - fetch에 전달할 옵션
 * @param accessToken - 인증된 사용자 access token
 *
 * @returns
 * 백엔드 API 응답 Promise
 *
 * @example
 * ```ts
 * // JSON body
 * return proxy<UserResponse, UpdateUserDto>(
 *   '/users/me',
 *   { method: 'PATCH', body },
 *   accessToken
 * );
 * ```
 *
 * @example
 * ```ts
 * // FormData body
 * return proxy<ImageUploadResponse, FormData>(
 *   '/users/me/image',
 *   { method: 'POST', body: formData },
 *   accessToken
 * );
 * ```
 */
export const proxy = <TResponse, TBody = unknown>(
  endpoint: string,
  options: ProxyOptions<TBody>,
  accessToken: string
) => {
  let resolvedBody: BodyInit | undefined;

  if (options.body !== undefined) {
    if (typeof options.body === 'object' && !(options.body instanceof FormData)) {
      resolvedBody = JSON.stringify(options.body);
    } else {
      resolvedBody = options.body as BodyInit;
    }
  }

  return serverFetch<TResponse>(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    body: resolvedBody,
  });
};
