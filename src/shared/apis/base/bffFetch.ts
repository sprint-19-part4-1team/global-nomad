import { coreFetch } from '@/shared/apis/base/coreFetch';
import { useUserStore } from '@/shared/stores/userStore';
import { isApiError } from '@/shared/utils/errorGuards';

const BASE_URL = '/api';

let refreshPromise: Promise<void> | null = null;

/**
 * 토큰 갱신 함수 (내부용)
 * - 중복된 refresh 요청을 방지하기 위해 Promise를 공유합니다.
 */
const refreshTokenInternal = async (): Promise<void> => {
  if (refreshPromise) {
    // 이미 진행 중인 작업을 재사용
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      await coreFetch('/api/auth/tokens', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      refreshPromise = null;
    }
  })();
  // 새 작업을 시작하고 반환
  return refreshPromise;
};

/**
 * ## bffFetch
 * Next.js API Route(BFF)를 호출하기 위한 공통 fetch 유틸 함수
 *
 * @description
 * - Next.js App Router에서 정의한 API Route(`/api/*`)를 호출하기 위한 fetch 래퍼입니다.
 * - 동일한 origin의 API Route를 호출하므로, 인증 쿠키(HttpOnly Cookie)를 항상 포함하여 요청합니다.
 * - 실제 요청 실행 및 에러 처리는 coreFetch에 위임합니다.
 * - 401 에러 발생 시 자동으로 토큰 갱신을 시도하고 원래 요청을 재시도합니다.
 * - 토큰 갱신 실패 시 자동으로 로그아웃 처리합니다.
 * - auth 관련 API(/auth/*)는 토큰 갱신 로직을 타지 않습니다.
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
  const url = BASE_URL + endpoint;
  const requestOptions = { ...options, credentials: 'include' as RequestCredentials };

  try {
    return coreFetch<T>(url, requestOptions, timeoutMs);
  } catch (err) {
    if (!isApiError(err) || err.status !== 401) {
      throw err;
    }

    if (endpoint.startsWith('/auth')) {
      throw err;
    }

    try {
      await refreshTokenInternal();

      return await coreFetch<T>(url, requestOptions, timeoutMs);
    } catch (refreshError) {
      // eslint-disable-next-line no-console
      console.error('리프레시 토큰 갱신 실패:', refreshError);
      if (isApiError(refreshError) && refreshError.status === 401) {
        useUserStore.getState().clearSession('expired');
      }

      throw err;
    }
  }
};
