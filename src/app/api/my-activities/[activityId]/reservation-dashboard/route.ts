import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxy } from '@/shared/apis/bff/proxy';
import { FindReservationsByMonthResponseDto } from '@/shared/types/myActivities';

/**
 * ## 내 체험 월별 예약 현황 조회 API (BFF)
 *
 * @description
 * 로그인한 사용자가 등록한 특정 체험(Activity)에 대해 월 단위 예약 현황을 조회하는 API입니다.
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해 access token 검증 및 공통 에러 처리가 수행됩니다.
 * - URL 경로의 `activityId`는 조회할 체험을 식별합니다.
 * - 쿼리 파라미터(`year`, `month`)는 클라이언트 요청 URL의 search string을 그대로 사용하여 백엔드 API로 전달됩니다.
 * - 실제 조회 요청은 `proxy`를 통해 백엔드 API(`/my-activities/{activityId}/reservation-dashboard`)로 프록시됩니다.
 *
 * @param request - Next.js Route Handler의 Request 객체
 * @param context - 라우트 파라미터(`activityId`)를 포함한 컨텍스트
 *
 * @returns 월별 예약 현황 리스트 (`FindReservationsByMonthResponseDto[]`)
 */

export const GET = async (request: Request, context: { params: { activityId: string } }) => {
  const routeHandler = createAuthorizedRoute(async ({ accessToken, request }) => {
    const { activityId } = context.params;
    const { search } = new URL(request.url);

    return proxy<FindReservationsByMonthResponseDto[]>(
      `/my-activities/${activityId}/reservation-dashboard${search}`,
      { method: 'GET' },
      accessToken
    );
  });

  return routeHandler(request);
};
