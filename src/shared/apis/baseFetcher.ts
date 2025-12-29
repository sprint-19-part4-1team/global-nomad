let refreshPromise: Promise<void> | null = null;

/**
 * 공통 fetcher 함수
 * @param endpoint - API 엔드포인트 경로 (예: '/activities')
 * @param options - fetch API의 옵션 객체 (method, body, headers 등)
 * @returns {Promise<T>} 서버 응답 데이터 (JSON)
 * RequestInit란?
 * TypeScript 내장 타입으로, fetch 함수가 받을 수 있는 모든 설정값
 * ex) method(GET, POST 등), body, headers, cache, signal 등
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
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API 요청 중 오류가 발생했습니다.');
  }

  return response.json();
};
