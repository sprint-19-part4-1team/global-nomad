import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxy } from '@/shared/apis/bff/proxy';
import { MyActivitiesResponse } from '@/shared/types/myActivities';

/**
 * ## 내 체험 리스트 조회 API (BFF)
 *
 * @description
 * 로그인한 사용자가 등록한 체험(Activity) 목록을 조회하는 API입니다.
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해 access token 검증 및 공통 에러 처리가 수행됩니다.
 * - 클라이언트에서 전달된 쿼리 파라미터(page, size, 정렬 조건 등)는
 *   `request.url`의 query string을 그대로 추출하여 백엔드 API(`/my-activities`)로 전달합니다.
 *
 * @returns 로그인한 사용자의 체험 리스트 조회 결과 (`MyActivitiesResponse`)
 */
export const GET = createAuthorizedRoute(async ({ accessToken, request }) => {
  const { search } = new URL(request.url);

  return proxy<MyActivitiesResponse>(`/my-activities${search}`, { method: 'GET' }, accessToken);
});
