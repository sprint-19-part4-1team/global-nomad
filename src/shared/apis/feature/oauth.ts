import { bffFetch } from '@/shared/apis/base/bffFetch';
import type {
  UpsertOauthAppRequestBody,
  SignUpWithOauthRequestBody,
  SignInWithOauthRequestBody,
} from '@/shared/types/oauth';

/**
 * 간편 로그인 App 등록 및 수정 API (BFF)
 *
 * @param data - 간편 로그인 App 등록/수정에 필요한 정보
 * @returns 간편 로그인 App 등록/수정 API 응답 Promise
 */
export const registerOauthApp = (data: UpsertOauthAppRequestBody): Promise<any> => {
  // TODO: API 응답 타입이 확정되면 any 대신 구체적인 타입으로 교체해주세요.
  return bffFetch('/oauth/apps', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * OAuth 기반 간편 회원가입 API (BFF)
 *
 * @param data - OAuth 회원가입에 필요한 사용자 정보
 * @returns OAuth 회원가입 API 응답 Promise
 */
export const signUpWithOauth = (data: SignUpWithOauthRequestBody): Promise<any> => {
  // TODO: API 응답 타입이 확정되면 any 대신 구체적인 타입으로 교체해주세요.
  return bffFetch<any>('/oauth/sign-up/kakao', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * OAuth 기반 간편 로그인 API (BFF)
 *
 * @param data - OAuth 로그인에 필요한 사용자 정보
 * @returns OAuth 로그인 API 응답 Promise
 */
export const signInWithOauth = (data: SignInWithOauthRequestBody): Promise<any> => {
  // TODO: API 응답 타입이 확정되면 any 대신 구체적인 타입으로 교체해주세요.
  return bffFetch<any>('/oauth/sign-in/kakao', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
