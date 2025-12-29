'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const TAB_QUERY_KEY = 'tab';

interface UseTabsQueryParamOptions {
  defaultValue: string;
  replace?: boolean;
  scroll?: boolean;
}

/**
 * ## useTabsQueryParam
 *
 * @description
 * - URL의 `tab` 쿼리 파라미터(?tab=value)를 Tabs 컴포넌트에서 사용할 수 있도록
 * `value / onChangeValue` 형태로 변환해주는 훅입니다.
 * - 탭 상태를 URL과 동기화합니다.
 * - 새로고침 후에도 선택된 탭이 유지됩니다.
 *
 * @param defaultValue - 탭의 기본값
 * @param replace - history 관리 여부 (기본값 true)
 * @param scroll - 페이지 이동 시 스크롤 상단으로 끌어올릴지 여부 (기본값 false)
 *
 * @example
 * ```tsx
 * const { value, onChangeValue } = useTabsQueryParam({
 *   defaultValue: 'request',
 * });
 *
 * <Tabs value={value} onValueChange={onChangeValue}>
 *   ...
 * </Tabs>
 * ```
 */
const useTabsQueryParam = ({
  defaultValue,
  replace = true,
  scroll = false,
}: UseTabsQueryParamOptions) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const value = searchParams.get(TAB_QUERY_KEY) ?? defaultValue;

  const onChangeValue = useCallback(
    (nextValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(TAB_QUERY_KEY, nextValue);

      const url = `?${params.toString()}`;

      if (replace) {
        router.replace(url, { scroll: scroll });
      } else {
        router.push(url, { scroll: scroll });
      }
    },
    [replace, router, searchParams, scroll]
  );

  return { value, onChangeValue };
};

export default useTabsQueryParam;
