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

  // 코드가 서버에서 실행되는 경우를 대비해 체크
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    },
  });

  // 에러
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API 요청 중 오류가 발생했습니다.');
  }

  return response.json();
};
