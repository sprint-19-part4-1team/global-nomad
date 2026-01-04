import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxy } from '@/shared/apis/bff/proxy';
import { UpdateUserBodyDto, UserServiceResponseDto } from '@/shared/types/user';

/**
 * ## 내 정보 조회 API (BFF)
 *
 * @description
 * 로그인한 사용자의 정보를 조회하는 API입니다.
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해
 *   access token 검증 및 공통 에러 처리가 수행됩니다.
 * - 실제 데이터 조회 요청은 `proxy`를 통해 백엔드 API(`/users/me`)로 전달됩니다.
 *
 * @returns 수정된 사용자 정보 (`UserServiceResponseDto`)
 */
export const GET = createAuthorizedRoute(async ({ accessToken }) => {
  return proxy<UserServiceResponseDto>('/users/me', { method: 'GET' }, accessToken);
});

/**
 * ## 내 정보 수정 API (BFF)
 *
 * @description
 * 로그인한 사용자의 정보를 수정하는 API입니다.
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해
 *   access token 검증, body 파싱(JSON), 공통 에러 처리가 수행됩니다.
 * - 요청 body는 `UpdateUserBodyDto` 타입으로 제한되며, 수정할 필드만 선택적으로 전달할 수 있습니다.
 * - 실제 수정 요청은 `proxy`를 통해 백엔드 API(`/users/me`)로 전달됩니다.
 *
 * @param body 수정할 사용자 정보
 *
 * @returns 수정된 사용자 정보 (`UserServiceResponseDto`)
 */
export const PATCH = createAuthorizedRoute<UpdateUserBodyDto>(async ({ accessToken, body }) => {
  return proxy<UserServiceResponseDto, UpdateUserBodyDto>(
    '/users/me',
    { method: 'PATCH', body },
    accessToken
  );
});
