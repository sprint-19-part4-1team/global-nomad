import { coreFetch } from '@/shared/apis/base/coreFetch';

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
