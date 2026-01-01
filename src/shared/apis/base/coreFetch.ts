import { isRecord } from '@/shared/utils/errorGuards';

type ApiError = Error & {
  status: number;
  code?: string;
};

const isAbortError = (error: unknown): boolean => {
  if (!isRecord(error)) {
    return false;
  }

  return error.name === 'AbortError';
};

/**
 * ### coreFetch
 *
 * @description
 * URL과 RequestInit 옵션을 받아 fetch 요청을 실행하는 공통 실행기 함수입니다.
 *
 * @error
 * - 요청이 abort된 경우(시간 초과 또는 외부 취소), Error를 throw 합니다.
 * - HTTP 상태 코드가 2xx가 아닌 경우, status와 code를 포함한 ApiError를 throw 합니다.
 *
 * @param url
 * - 완성된 요청 URL
 * @param options
 * - fetch에 전달할 RequestInit 옵션
 * @param timeoutMs
 * - 요청 제한 시간(ms), 기본값은 10초
 *
 * @returns
 * 응답이 204(No Content)인 경우 undefined를 반환하고 그 외는 JSON 파싱 데이터 반환
 */
export const coreFetch = async <T>(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 10_000
): Promise<T> => {
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

  const request = async (): Promise<Response> => {
    const controller = new AbortController();
    const headers = new Headers(options.headers);

    if (isFormData) {
      headers.delete('Content-Type');
    } else if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    let abortHandler: (() => void) | undefined;

    if (options.signal) {
      abortHandler = () => controller.abort();

      if (options.signal.aborted) {
        controller.abort();
      } else {
        options.signal.addEventListener('abort', abortHandler);
      }
    }

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers,
      });
      return response;
    } catch (error) {
      if (isAbortError(error)) {
        throw new Error('요청이 지연되고 있습니다. 다시 시도해주세요.');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
      if (options.signal && abortHandler) {
        options.signal.removeEventListener('abort', abortHandler);
      }
    }
  };

  let response = await request();

  if (!response.ok) {
    const errorData: { message?: string; code?: string } = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || 'API 요청 중 오류가 발생했습니다.') as ApiError;
    error.status = response.status;
    error.code = errorData.code;

    throw error;
  }
  return response.status === 204 ? (undefined as T) : response.json();
};
