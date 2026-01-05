import { coreFetch } from '@/shared/apis/base/coreFetch';

/**
 * ### publicFetch
 *
 * @description
 * - 비인증(public) API 호출을 위한 fetch 래퍼 함수입니다.
 *
 * @param endpoint
 * - `/`로 시작하는 백엔드 API 엔드포인트
 *
 * @param options
 * - fetch에 전달할 RequestInit 옵션
 *
 * @param timeoutMs
 * - 요청 제한 시간(ms)
 * - 지정하지 않으면 coreFetch의 기본 timeout을 사용합니다.
 *
 * @returns
 * JSON 파싱된 응답 데이터
 */
export const publicFetch = async <T>(
  endpoint: string,
  options: RequestInit = {},
  timeoutMs?: number
): Promise<T> => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_URL 환경 변수가 설정되지 않았습니다.');
  }
  const url = BASE_URL + endpoint;

  return coreFetch<T>(url, options, timeoutMs);
};
