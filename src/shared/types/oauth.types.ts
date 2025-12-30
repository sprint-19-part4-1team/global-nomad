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
