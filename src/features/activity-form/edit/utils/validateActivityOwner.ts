import { AUTH_COOKIE_KEYS } from '@/shared/constants';
import { getAuthCookies } from '@/shared/utils/authCookies';
import { getJwtUserId } from '@/shared/utils/jwt';

/**
 * ## validateActivityOwner
 *
 * @description
 * - 현재 로그인한 사용자가 특정 체험(Activity)의 작성자인지 검증하는 유틸 함수입니다.
 * - 인증 쿠키에 저장된 Access Token을 기반으로 사용자 ID를 추출하여 비교합니다.
 * - 서버 컴포넌트에서 사용하기 위해 만들었습니다.
 *
 * @param activityUserId - 체험을 생성한 사용자 ID
 *
 * @returns
 * - 작성자인 경우 `true`
 * - 인증되지 않았거나 작성자가 아닌 경우 `false`
 */
export const validateActivityOwner = async (activityUserId?: number) => {
  if (!activityUserId) {
    return false;
  }

  const accessToken = await getAuthCookies(AUTH_COOKIE_KEYS.ACCESS_TOKEN);

  if (!accessToken) {
    return false;
  }

  const currentUserId = getJwtUserId(accessToken);
  return activityUserId === currentUserId;
};
