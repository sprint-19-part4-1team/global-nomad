import { baseFetcher } from '@/shared/apis/baseFetcher';

export type OauthProvider = 'kakao';

export interface UpsertOauthAppRequestBody {
  appKey: string;
  provider: OauthProvider;
}
export interface SignInWithOauthRequestBody {
  redirectUri: string;
  token: string;
}
export interface SignUpWithOauthRequestBody extends SignInWithOauthRequestBody {
  nickname: string;
}

// 간편 로그인 App 등록/수정
export const registerOauthApp = (data: UpsertOauthAppRequestBody) => {
  return baseFetcher('/oauth/apps', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// 간편 회원가입
export const signUpWithOauth = (data: SignUpWithOauthRequestBody) => {
  return baseFetcher('/oauth/sign-up/kakao', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// 간편 로그인
export const signInWithOauth = (data: SignInWithOauthRequestBody) => {
  return baseFetcher('/oauth/sign-in/kakao', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
