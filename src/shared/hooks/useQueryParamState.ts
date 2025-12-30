'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type ParseOption<T> = T extends string ? { parse?: (v: string) => T } : { parse: (v: string) => T };

type UseQueryParamStateOptions<T> = {
  defaultValue: T;
  serialize?: (value: T) => string;
  replace?: boolean;
  scroll?: boolean;
  removeParam?: (value: T) => boolean;
} & ParseOption<T>;

/**
 * ## useQueryParamState
 *
 * @description
 * URL의 쿼리 파라미터를 React state처럼 읽고/쓸 수 있도록 도와주는 훅입니다.
 *
 * - 상태 변경 시 URL을 동기화합니다.
 * - 기본값일 경우 쿼리 파라미터를 제거할 수 있습니다.
 * - `push / replace`, `scroll` 옵션을 제어할 수 있습니다.
 *
 * @param key - 쿼리 키
 * @param parse - URL string을 원하는 타입의 상태값으로 변환하는 함수
 * @param serialize - 상태값 → URL string으로 변환하는 함수
 * @param replace - history 관리 방식 (true: replace, false: push)
 * @param scroll - 라우팅 시 스크롤 이동 여부 (기본값: false)
 * @param removeParam - 특정 조건일 때 쿼리 파라미터를 제거할 지 여부
 *
 * @example
 * ```ts
 * const [tabValue, setTabValue] = useQueryParamState(TAB_QUERY_KEY, {
 *   defaultValue: 'request',
 *   removeParam: (v) => v === 'request',
 * });
 * ```
 */

const useQueryParamState = <T = string>(
  key: string,
  {
    defaultValue,
    parse = (v) => v as T,
    serialize = String,
    replace = true,
    scroll = false,
    removeParam,
  }: UseQueryParamStateOptions<T>
): [T, (next: T) => void] => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const raw = searchParams.get(key);

  let value: T = defaultValue;

  if (raw != null) {
    try {
      value = parse(raw);
    } catch {
      /** URL은 불확실한 값이기 때문에 파싱 실패 시 기본값으로 복구 */
      value = defaultValue;
    }
  }

  const setValue = useCallback(
    (nextValue: T) => {
      const params = new URLSearchParams(searchParams.toString());

      if (removeParam?.(nextValue)) {
        params.delete(key);
      } else {
        params.set(key, serialize(nextValue));
      }

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      if (replace) {
        router.replace(url, { scroll: scroll });
      } else {
        router.push(url, { scroll: scroll });
      }
    },
    [key, pathname, replace, router, scroll, searchParams, serialize, removeParam]
  );

  return [value, setValue];
};

export default useQueryParamState;
