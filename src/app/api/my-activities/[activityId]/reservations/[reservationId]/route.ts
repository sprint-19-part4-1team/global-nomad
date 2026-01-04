import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxy } from '@/shared/apis/bff/proxy';
import { UpdateMyActivityReservationBodyDto } from '@/shared/types/myActivities';
import { ReservationResponseDto } from '@/shared/types/myReservations';

/**
 * ## 내 체험 예약 상태(승인, 거절) 업데이트 API (BFF)
 *
 * @description
 * 로그인한 사용자가 자신이 등록한 체험(Activity)에 대해
 * 특정 예약(Reservation)의 상태를 승인 또는 거절로 변경하는 API입니다.
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해 access token 검증, 요청 body 파싱(JSON), 공통 에러 처리가 수행됩니다.
 * - URL 경로의 `activityId`는 예약이 속한 체험을 식별합니다.
 * - URL 경로의 `reservationId`는 상태를 변경할 예약을 식별합니다.
 * - 요청 body는 `UpdateMyActivityReservationBodyDto` 타입으로 제한됩니다.
 * - 실제 상태 변경 요청은 `proxy`를 통해
 *   백엔드 API(`/my-activities/{activityId}/reservations/{reservationId}`)로 전달됩니다.
 *
 * @param request - Next.js Route Handler의 Request 객체
 * @param context - 라우트 파라미터(`activityId`, `reservationId`)를 포함한 컨텍스트
 *
 * @returns 상태가 변경된 예약 정보 (`ReservationResponseDto`)
 */
export const PATCH = async (
  request: Request,
  context: { params: { activityId: string; reservationId: string } }
) => {
  const routeHandler = createAuthorizedRoute<UpdateMyActivityReservationBodyDto>(
    async ({ accessToken, body }) => {
      const { activityId, reservationId } = context.params;

      return proxy<ReservationResponseDto, UpdateMyActivityReservationBodyDto>(
        `/my-activities/${activityId}/reservations/${reservationId}`,
        { method: 'PATCH', body },
        accessToken
      );
    }
  );

  return routeHandler(request);
};
