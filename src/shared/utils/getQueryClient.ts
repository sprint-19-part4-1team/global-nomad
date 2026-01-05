import { isServer, QueryClient } from '@tanstack/react-query';

/**
 * QueryClient 인스턴스를 생성하는 팩토리 함수
 *
 * @description
 * - 공통 defaultOptions를 한 곳에서 관리하기 위해 분리한 함수입니다.
 * - 서버/클라이언트 환경에 따라 서로 다른 QueryClient를 생성해야 하므로
 *   직접 new QueryClient()를 호출하지 않고 이 함수를 통해 생성합니다.
 */
const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
};

/**
 * 브라우저 환경에서 재사용되는 QueryClient 인스턴스
 *
 * @remarks
 * - 클라이언트에서는 QueryClient를 하나만 유지해야 캐시가 유지됩니다.
 * - 컴포넌트 리렌더 또는 페이지 이동 시 새 QueryClient가 생성되는 것을 방지합니다.
 */
let browserQueryClient: QueryClient | undefined = undefined;

/**
 * 실행 환경(Server / Browser)에 맞는 QueryClient를 반환합니다.
 *
 * @description
 * - Server: 요청마다 새로운 QueryClient를 생성하여 반환합니다. (유저 간 캐시 공유 방지)
 * - Browser: 단일 QueryClient 인스턴스를 재사용합니다. (캐시 유지 및 hydration 안정성 확보)
 *
 * @remarks
 * - Next.js(App Router)에서 SSR, RSC, Streaming 환경을 안전하게 지원하기 위한 패턴입니다.
 * - React Query를 사용하는 모든 Provider / Server Prefetch 로직에서
 *   반드시 이 함수를 통해 QueryClient를 획득해야 합니다.
 *
 * @example
 * ```ts
 * const queryClient = getQueryClient();
 * ```
 */
export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
};
