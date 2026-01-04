import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxy } from '@/shared/apis/bff/proxy';
import { CreateReservationBodyDto } from '@/shared/types/activities';
import { ReservationResponseDto } from '@/shared/types/myReservations';

/**
 * ## 체험 예약 신청 API (BFF)
 *
 * @description
 * 특정 체험(Activity)에 대해 새로운 예약을 신청하는 API입니다.
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해
 *   access token 검증, 요청 body 파싱(JSON), 공통 에러 처리가 수행됩니다.
 * - URL 경로의 `activityId`는 예약을 신청할 체험을 식별합니다.
 * - 요청 body는 `CreateReservationBodyDto` 타입으로 제한되며,
 *   예약할 일정(scheduleId)과 인원(headCount) 정보를 포함합니다.
 * - 실제 예약 신청 요청은 `proxy`를 통해
 *   백엔드 API(`/activities/{activityId}/reservations`)로 전달됩니다.
 *
 * @param body 체험 예약 신청에 필요한 정보
 *
 * @returns 생성된 예약 정보 (`ReservationResponseDto`)
 */
export const POST = async (request: Request, context: { params: { activityId: string } }) => {
  const routeHandler = createAuthorizedRoute<CreateReservationBodyDto>(
    async ({ accessToken, body }) => {
      const { activityId } = context.params;

      return proxy<ReservationResponseDto, CreateReservationBodyDto>(
        `/activities/${activityId}/reservations`,
        { method: 'POST', body },
        accessToken
      );
    }
  );

  return routeHandler(request);
};
