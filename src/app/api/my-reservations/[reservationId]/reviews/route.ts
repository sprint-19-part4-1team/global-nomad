import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxy } from '@/shared/apis/bff/proxy';
import { CreateReviewBodyDto, CreateReviewResponse } from '@/shared/types/myReservations';

/**
 * ## 내 예약 리뷰 작성 API (BFF)
 *
 * @description
 * 로그인한 사용자가 특정 예약에 대해 리뷰를 작성하는 API입니다.
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해 access token 검증, 요청 body 파싱(JSON), 공통 에러 처리가 수행됩니다.
 * - URL 경로의 `reservationId`는 리뷰를 작성할 예약을 식별합니다.
 * - 요청 body는 `CreateReviewBodyDto` 타입으로 제한됩니다.
 *
 * @param body 리뷰 작성에 필요한 정보
 *
 * @returns 생성된 리뷰 정보 (`CreateReviewResponse`)
 */
export const POST = async (request: Request, context: { params: { reservationId: string } }) => {
  const routeHandler = createAuthorizedRoute<CreateReviewBodyDto>(async ({ accessToken, body }) => {
    const { reservationId } = context.params;

    return proxy<CreateReviewResponse, CreateReviewBodyDto>(
      `/my-reservations/${reservationId}/reviews`,
      { method: 'POST', body },
      accessToken
    );
  });

  return routeHandler(request);
};
