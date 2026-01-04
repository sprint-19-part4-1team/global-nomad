import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxy } from '@/shared/apis/bff/proxy';
import { ReservedScheduleResponseDto } from '@/shared/types/myActivities';

/**
 * ## 내 체험 날짜별 예약 정보 조회 API (BFF)
 *
 * @description
 * 로그인한 사용자가 등록한 특정 체험(Activity)에 대해 지정한 날짜를 기준으로 예약 목록을 조회하는 API입니다.
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해 access token 검증 및 공통 에러 처리가 수행됩니다.
 * - URL 경로의 `activityId`는 조회할 체험을 식별합니다.
 * - 쿼리 파라미터(`date`)는 클라이언트 요청 URL의 search string을 그대로 사용하여 백엔드 API로 전달됩니다.
 * - 실제 조회 요청은 `proxy`를 통해 백엔드 API(`/my-activities/{activityId}/reserved-schedule`)로 프록시됩니다.
 *
 * @param request - Next.js Route Handler의 Request 객체
 * @param context - 라우트 파라미터(`activityId`)를 포함한 컨텍스트
 *
 * @returns 날짜별 예약 목록 (`ReservedScheduleResponseDto[]`)
 */
export const GET = async (request: Request, context: { params: { activityId: string } }) => {
  const routeHandler = createAuthorizedRoute(async ({ accessToken, request }) => {
    const { activityId } = context.params;
    const { search } = new URL(request.url);

    return proxy<ReservedScheduleResponseDto[]>(
      `/my-activities/${activityId}/reserved-schedule${search}`,
      { method: 'GET' },
      accessToken
    );
  });

  return routeHandler(request);
};
