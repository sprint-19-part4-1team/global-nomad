type ApiError = Error & {
  status: number;
  code?: string;
};

let refreshPromise: Promise<void> | null = null;

/**
 * ### baseFetcher
 * @description
 * - 모든 API 요청에 공통으로 사용되는 fetch 유틸 함수입니다.
 * - `credentials: 'include'`가 기본 적용되어 있어, 쿠키 기반 인증을 사용합니다.
 * - 요청 body가 `FormData`인 경우에는 `Content-Type`을 자동으로 설정하지 않습니다.
 * - 응답이 401이고 `/auth` 도메인이 아닌 경우, 토큰 재발급(`/auth/tokens`)을 1회만 시도한 뒤
 *   원래 요청을 재시도합니다.
 *
 * @template T
 * @param endpoint - API 엔드포인트 경로 (예: `/activities`)
 * @param options - fetch API 옵션 (`method`, `body`, `headers` 등)
 * @returns 서버 응답 JSON을 제네릭 타입 `T`로 반환합니다.
 *
 * @throws
 * - 인증 만료 또는 재발급 실패 시 Error를 throw합니다.
 * - 그 외 응답이 `ok`가 아닐 경우 서버 메시지를 포함한 Error를 throw합니다.
 */
export const baseFetcher = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

  const request = async (): Promise<Response> => {
    return fetch(`${BASE_URL}${endpoint}`, {
      credentials: 'include',
      ...options,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
    });
  };

  let response = await request();

  if (response.status === 401 && !endpoint.startsWith('/auth')) {
    if (!refreshPromise) {
      refreshPromise = fetch(`${BASE_URL}/auth/tokens`, {
        method: 'POST',
        credentials: 'include',
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('토큰 재발급 실패');
          }
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    try {
      await refreshPromise;
      response = await request();
    } catch {
      throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
    }
  }

  if (!response.ok) {
    const errorData: { message?: string; code?: string } = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || 'API 요청 중 오류가 발생했습니다.') as ApiError;
    error.status = response.status;
    error.code = errorData.code;

    throw error;
  }
  return response.status === 204 ? (undefined as T) : response.json();
};
