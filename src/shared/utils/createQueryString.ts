export type QueryValue = string | number | boolean;

const isQueryValue = (value: unknown): value is QueryValue => {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
};

/**
 * 객체 형태의 query parameter를 URL query string으로 변환하는 유틸 함수
 *
 * @description
 * - `undefined` 또는 `null` 값은 query string에서 제외됩니다.
 * - `string | number | boolean` 값만 query string에 포함됩니다.
 * - 유효한 파라미터가 없는 경우 빈 문자열(`''`)을 반환합니다.
 *
 * @param params
 * - query string으로 변환할 key-value 객체
 *
 * @returns
 * - `?key=value&key2=value2` 형태의 query string
 * - 파라미터가 없을 경우 빈 문자열(`''`)
 *
 * @example
 * ```ts
 * createQueryString({ page: 1, size: 10 });
 * // → '?page=1&size=10'
 *
 * createQueryString({ keyword: undefined, category: 'travel' });
 * // → '?category=travel'
 * ```
 */
export const createQueryString = <T extends object>(params: T): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (!isQueryValue(value)) {
      return;
    }
    searchParams.append(key, String(value));
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};
