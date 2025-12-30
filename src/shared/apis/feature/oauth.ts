import { baseFetcher } from '@/shared/apis/base/baseFetcher';
import type {
  UpsertOauthAppRequestBody,
  SignUpWithOauthRequestBody,
  SignInWithOauthRequestBody,
} from '@/shared/types/oauth.types';

/**
 * 간편 로그인 App 등록 및 수정 API
 *
 * @param data - 간편 로그인 App 등록/수정에 필요한 정보
 * @returns 간편 로그인 App 등록/수정 API 응답 Promise
 */
export const registerOauthApp = (data: UpsertOauthAppRequestBody) => {
  return baseFetcher('/oauth/apps', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * OAuth 기반 간편 회원가입 API
 *
 * @param data - OAuth 회원가입에 필요한 사용자 정보
 * @returns OAuth 회원가입 API 응답 Promise
 */
export const signUpWithOauth = (data: SignUpWithOauthRequestBody) => {
  return baseFetcher('/oauth/sign-up/kakao', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * OAuth 기반 간편 로그인 API
 *
 * @param data - OAuth 로그인에 필요한 사용자 정보
 * @returns OAuth 로그인 API 응답 Promise
 */
export const signInWithOauth = (data: SignInWithOauthRequestBody) => {
  return baseFetcher('/oauth/sign-in/kakao', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
