import { coreFetch } from '@/shared/apis/base/coreFetch';

/**
 * ## bffFetch
 * Next.js API Route(BFF)를 호출하기 위한 공통 fetch 유틸 함수
 *
 * @description
 * - Next.js App Router에서 정의한 API Route(`/api/*`)를 호출하기 위한 fetch 래퍼입니다.
 * - 동일한 origin의 API Route를 호출하므로, 인증 쿠키(HttpOnly Cookie)를 항상 포함하여 요청합니다.
 * - 실제 요청 실행 및 에러 처리는 coreFetch에 위임합니다.
 *
 * @param {string} endpoint - 호출할 API Route의 엔드포인트 (예: `/auth/login`)
 * @param {RequestInit} options - fetch에 전달할 RequestInit 옵션
 * @param {number} [timeoutMs] - 요청 제한 시간(ms), 미지정 시 coreFetch의 기본 timeout 사용
 *
 * @returns {Promise<T>} API Route 응답 JSON 데이터
 *
 * @throws
 * - ApiError: HTTP 상태 코드가 2xx가 아닌 경우
 * - Error: 요청이 취소되거나(timeout / abort) 예기치 못한 오류가 발생한 경우
 */
export const bffFetch = async <T>(
  endpoint: string,
  options: RequestInit,
  timeoutMs?: number
): Promise<T> => {
  const BASE_URL = '/api';
  const url = BASE_URL + endpoint;

  return coreFetch<T>(url, { ...options, credentials: 'include' }, timeoutMs);
};
