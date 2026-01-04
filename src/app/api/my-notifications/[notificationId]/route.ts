import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxy } from '@/shared/apis/bff/proxy';

/**
 * ## 내 알림 삭제 API (BFF)
 *
 * @description
 * 로그인한 사용자의 특정 알림을 삭제하는 API입니다.
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해
 *   access token 검증 및 공통 에러 처리가 수행됩니다.
 * - URL 경로의 `notificationId`는 삭제할 알림을 식별합니다.
 * - DELETE 요청이므로 body는 사용하지 않습니다.
 * - 실제 삭제 요청은 `proxy`를 통해
 *   백엔드 API(`/my-notifications/{notificationId}`)로 전달됩니다.
 *
 * @returns 삭제 성공 시 204 No Content
 */
export const DELETE = async (request: Request, context: { params: { notificationId: string } }) => {
  const routeHandler = createAuthorizedRoute(async ({ accessToken }) => {
    const { notificationId } = context.params;

    return proxy<void>(`/my-notifications/${notificationId}`, { method: 'DELETE' }, accessToken);
  });

  return routeHandler(request);
};
