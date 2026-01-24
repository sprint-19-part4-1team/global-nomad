'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef } from 'react';
import { signInWithOauth, signUpWithOauth } from '@/shared/apis/feature/oauth';
import Spinner from '@/shared/components/spinner/Spinner';
import type { OAuthMode } from '@/shared/constants';
import { useUserStore } from '@/shared/stores/userStore';
import { isRecord } from '@/shared/utils/errorGuards';

// 카카오 회원 랜덤 닉네임
const generateTempNickname = () => {
  const rand = Math.random().toString(36).slice(2, 6);
  return `kakao${rand}`;
};

const getErrorMessage = (err: unknown): string => {
  if (isRecord(err) && typeof err.message === 'string') {
    return err.message;
  }
  return '';
};

const isAlreadyRegisteredUserError = (message: string) => {
  return message.includes('이미') && (message.includes('등록') || message.includes('가입'));
};

/**
 * Kakao OAuth 콜백 처리 페이지.
 *
 * @description
 * - 쿼리스트링의 `code`, `state`를 파싱한다.
 * - `state` 값에 따라 카카오 로그인 또는 회원가입 BFF API를 호출한다.
 * - 성공 시 `{ user, accessTokenExpiresAt }`로 세션을 저장하고 `/`로 이동한다.
 * - 회원가입 시 이미 가입된 사용자 오류는 로그인(authorize)으로 재시도한다.
 *
 * @returns `카카오 처리 중...`안내 UI를 렌더링한다.
 */
function KakaoOauthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasProcessedRef = useRef(false);
  const setSession = useUserStore((state) => state.setSession);

  useEffect(() => {
    if (hasProcessedRef.current) {
      return;
    }
    hasProcessedRef.current = true;

    const code = searchParams.get('code');
    const state = (searchParams.get('state') as OAuthMode | null) ?? 'signin';

    const error = searchParams.get('error');
    if (error) {
      useUserStore.getState().setOAuthError('로그인에 실패했습니다.');
      router.replace('/login');
      return;
    }

    if (!code) {
      useUserStore.getState().setOAuthError('로그인에 실패했습니다.');
      router.replace('/login');
      return;
    }

    const redirectToAuthorizeSignin = () => {
      window.location.replace('/api/oauth/kakao/authorize?mode=signin');
    };

    const isSignup = state === 'signup';
    (async () => {
      try {
        const res = isSignup
          ? await signUpWithOauth({
              nickname: generateTempNickname(),
              token: code,
            })
          : await signInWithOauth({ token: code });

        setSession({
          user: res.user,
          accessTokenExpiresAt: res.accessTokenExpiresAt,
        });

        router.replace('/');
      } catch (err: unknown) {
        const message = getErrorMessage(err);

        if (isSignup && isAlreadyRegisteredUserError(message)) {
          redirectToAuthorizeSignin();
          return;
        }

        const errorMessage = isSignup ? '회원가입에 실패했습니다.' : '로그인에 실패했습니다.';
        const redirectUrl = isSignup ? '/signup' : '/login';
        useUserStore.getState().setOAuthError(errorMessage);
        router.replace(redirectUrl);
      }
    })();
  }, [router, searchParams, setSession]);

  return (
    <div className='flex min-h-[60vh] items-center justify-center'>
      <Spinner size={48} borderWidth={4} />
    </div>
  );
}

export default function KakaoOauthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-[60vh] items-center justify-center'>
          <Spinner size={48} borderWidth={4} />
        </div>
      }>
      <KakaoOauthCallbackInner />
    </Suspense>
  );
}
