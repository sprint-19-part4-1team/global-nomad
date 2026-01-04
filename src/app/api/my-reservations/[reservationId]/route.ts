import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxy } from '@/shared/apis/bff/proxy';
import { UpdateMyReservationBodyDto, ReservationResponseDto } from '@/shared/types/myReservations';

/**
 * ## 내 예약 수정(취소) API (BFF)
 *
 * @description
 * 로그인한 사용자의 예약 상태를 수정하거나 취소하는 API입니다.
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해 access token 검증, 요청 body 파싱(JSON), 공통 에러 처리가 수행됩니다.
 * - URL 경로의 `reservationId`는 수정할 예약을 식별합니다.
 * - 요청 body는 `UpdateMyReservationBodyDto` 타입으로 제한됩니다.
 *
 * @param body 예약 수정(취소)에 필요한 정보
 *
 * @returns 수정된 예약 정보 (`ReservationResponseDto`)
 */
export const PATCH = async (request: Request, context: { params: { reservationId: string } }) => {
  const routeHandler = createAuthorizedRoute<UpdateMyReservationBodyDto>(
    async ({ accessToken, body }) => {
      const { reservationId } = context.params;

      return proxy<ReservationResponseDto, UpdateMyReservationBodyDto>(
        `/my-reservations/${reservationId}`,
        { method: 'PATCH', body },
        accessToken
      );
    }
  );

  return routeHandler(request);
};
