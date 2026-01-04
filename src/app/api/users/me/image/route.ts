import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxy } from '@/shared/apis/bff/proxy';
import { CreateProfileImageUrlResponse } from '@/shared/types/user';

/**
 * ## 프로필 이미지 업로드 URL 생성 API (BFF)
 *
 * @description
 * 로그인한 사용자의 프로필 이미지를 업로드하기 위한
 * 이미지 URL을 생성하는 API입니다.
 *
 * - 인증이 필요한 API로, `createAuthorizedRoute`를 통해
 *   access token 검증 및 공통 에러 처리가 수행됩니다.
 * - 요청 body는 `multipart/form-data` 형식의 파일(`File`)이며,
 *   `createAuthorizedRoute`에서 `FormData`로 파싱됩니다.
 * - 실제 백엔드 요청은 `proxy`를 통해 `/users/me/image` 엔드포인트로 전달됩니다.
 *
 * @param body 업로드할 프로필 이미지 파일
 *
 * @returns 생성된 프로필 이미지 URL (`CreateProfileImageUrlResponse`)
 */
export const POST = createAuthorizedRoute<File>(async ({ accessToken, body }) => {
  return proxy<CreateProfileImageUrlResponse>(
    '/users/me/image',
    { method: 'POST', body },
    accessToken
  );
});
