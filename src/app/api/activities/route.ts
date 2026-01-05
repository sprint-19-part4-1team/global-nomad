import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxy } from '@/shared/apis/bff/proxy';
import { ActivityWithSchedulesResponseDto, CreateActivityBodyDto } from '@/shared/types/activities';

/**
 * ## 체험 등록 API (BFF)
 *
 * @description
 * 새로운 체험(Activity)을 등록하는 API입니다.
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해
 *   access token 검증, 요청 body 파싱(JSON), 공통 에러 처리가 수행됩니다.
 * - 요청 body는 `CreateActivityBodyDto` 타입으로 제한되며,
 *   체험 기본 정보, 일정(schedules), 이미지 URL 정보를 포함합니다.
 * - 실제 체험 등록 요청은 `proxy`를 통해
 *   백엔드 API(`/activities`)로 전달됩니다.
 *
 * @param body 체험 등록에 필요한 정보
 * @returns 등록된 체험 정보 및 일정 목록 (`ActivityWithSchedulesResponseDto`)
 */
export const POST = createAuthorizedRoute<CreateActivityBodyDto>(async ({ accessToken, body }) => {
  return proxy<ActivityWithSchedulesResponseDto, CreateActivityBodyDto>(
    '/activities',
    { method: 'POST', body },
    accessToken
  );
});
