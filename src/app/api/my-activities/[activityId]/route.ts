import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxy } from '@/shared/apis/bff/proxy';
import { ActivityWithSchedulesResponseDto } from '@/shared/types/activities';
import { UpdateMyActivityBodyDto } from '@/shared/types/myActivities';

/**
 * ## 내 체험 수정 API (BFF)
 *
 * @description
 * 로그인한 사용자가 등록한 체험(Activity)의 정보를 수정하는 API입니다.
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해
 *   access token 검증, 요청 body 파싱(JSON), 공통 에러 처리가 수행됩니다.
 * - URL 경로의 `activityId`는 수정할 체험을 식별합니다.
 * - 요청 body는 `UpdateMyActivityBodyDto` 타입으로 제한되며,
 *   체험의 제목, 설명, 가격, 일정, 이미지 등의 정보를 수정할 수 있습니다.
 * - 실제 체험 수정 요청은 `proxy`를 통해 백엔드 API(`/my-activities/{activityId}`)로 전달됩니다.
 *
 * @param request - Next.js Route Handler의 Request 객체
 * @param context - 라우트 파라미터(`activityId`)를 포함한 컨텍스트
 *
 * @returns 수정된 체험 정보 및 일정 목록 (`ActivityWithSchedulesResponseDto`)
 */
export const PATCH = async (request: Request, context: { params: { activityId: string } }) => {
  const routeHandler = createAuthorizedRoute<UpdateMyActivityBodyDto>(
    async ({ accessToken, body }) => {
      const { activityId } = context.params;

      return proxy<ActivityWithSchedulesResponseDto, UpdateMyActivityBodyDto>(
        `/my-activities/${activityId}`,
        { method: 'PATCH', body },
        accessToken
      );
    }
  );

  return routeHandler(request);
};

/**
 * ## 내 체험 삭제 API (BFF)
 *
 * @description
 * 로그인한 사용자가 등록한 체험(Activity)을 삭제하는 API입니다.
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해 access token 검증 및 공통 에러 처리가 수행됩니다.
 * - URL 경로의 `activityId`는 삭제할 체험을 식별합니다.
 * - 실제 체험 삭제 요청은 `proxy`를 통해 백엔드 API(`/my-activities/{activityId}`)로 전달됩니다.
 *
 * @param request - Next.js Route Handler의 Request 객체
 * @param context - 라우트 파라미터(`activityId`)를 포함한 컨텍스트
 *
 * @returns 삭제 성공 시 204 No Content
 */
export const DELETE = async (request: Request, context: { params: { activityId: string } }) => {
  const routeHandler = createAuthorizedRoute(async ({ accessToken }) => {
    const { activityId } = context.params;

    return proxy<void>(`/my-activities/${activityId}`, { method: 'DELETE' }, accessToken);
  });

  return routeHandler(request);
};
