import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxy } from '@/shared/apis/bff/proxy';
import { GetMyReservationsResponse } from '@/shared/types/myReservations';

/**
 * ## 내 예약 리스트 조회 API (BFF)
 *
 * @description
 * 로그인한 사용자의 예약 목록을 조회하는 API입니다.
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해 access token 검증 및 공통 에러 처리가 수행됩니다.
 * - 클라이언트에서 전달된 쿼리 파라미터는 `request.url`의 search string을 통해 그대로 백엔드로 전달됩니다.
 *
 * @returns 내 예약 리스트 (`GetMyReservationsResponse`)
 */
export const GET = createAuthorizedRoute(async ({ accessToken, request }) => {
  const { search } = new URL(request.url);

  return proxy<GetMyReservationsResponse>(
    `/my-reservations${search}`,
    { method: 'GET' },
    accessToken
  );
});
