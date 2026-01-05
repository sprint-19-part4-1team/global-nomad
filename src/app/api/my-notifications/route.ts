import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxy } from '@/shared/apis/bff/proxy';
import { NotificationResponse } from '@/shared/types/myNotifications';

/**
 * ## 내 알림 리스트 조회 API (BFF)
 *
 * @description
 * 로그인한 사용자의 알림 목록을 조회하는 API입니다.
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해
 *   access token 검증 및 공통 에러 처리가 수행됩니다.
 * - 클라이언트에서 전달된 쿼리 파라미터는
 *   그대로 백엔드 API(`/my-notifications`)로 전달됩니다.
 *
 * @returns 로그인한 사용자의 알림 리스트 (`NotificationResponse`)
 */
export const GET = createAuthorizedRoute(async ({ accessToken, request }) => {
  const { search } = new URL(request.url);

  return proxy<NotificationResponse>(`/my-notifications${search}`, { method: 'GET' }, accessToken);
});
