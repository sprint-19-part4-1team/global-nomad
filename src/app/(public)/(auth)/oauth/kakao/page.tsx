'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { bffFetch } from '@/shared/apis/base/bffFetch';
import { useUserStore } from '@/shared/stores/userStore';
import type { UserServiceResponseDto } from '@/shared/types/user';

type OAuthSessionResponseBody = {
  user: UserServiceResponseDto;
  accessTokenExpiresAt: number;
};

type OAuthMode = 'signin' | 'signup';

// 카카오 회원 랜덤 닉네임
const generateTempNickname = () => {
  const rand = Math.random().toString(36).slice(2, 8);
  return `kakao_${rand}`;
};

const getErrorMessage = (err: unknown) => {
  if (typeof err === 'object' && err !== null && 'message' in err) {
    return String((err as { message: unknown }).message);
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
export default function KakaoOauthCallbackPage() {
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
      router.replace('/login?oauth=failed');
      return;
    }

    if (!code) {
      router.replace('/login?oauth=missing_code');
      return;
    }

    const redirectToAuthorizeSignin = () => {
      window.location.replace('/api/oauth/kakao/authorize?mode=signin');
    };

    (async () => {
      try {
        if (state === 'signup') {
          const res = await bffFetch<OAuthSessionResponseBody>('/oauth/sign-up/kakao', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nickname: generateTempNickname(),
              token: code,
            }),
          });

          setSession({
            user: res.user,
            accessTokenExpiresAt: res.accessTokenExpiresAt,
          });

          router.replace('/');
          return;
        }

        const res = await bffFetch<OAuthSessionResponseBody>('/oauth/sign-in/kakao', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: code }),
        });

        setSession({
          user: res.user,
          accessTokenExpiresAt: res.accessTokenExpiresAt,
        });

        router.replace('/');
      } catch (err: unknown) {
        const message = getErrorMessage(err);

        if (state === 'signup' && isAlreadyRegisteredUserError(message)) {
          redirectToAuthorizeSignin();
          return;
        }

        if (state === 'signup') {
          router.replace('/signup?oauth=signup_failed');
        } else {
          router.replace('/login?oauth=signin_failed');
        }
      }
    })();
  }, [router, searchParams, setSession]);

  return (
    <main className='flex min-h-[60vh] items-center justify-center'>
      <p className='body-20 font-semibold text-gray-700'>카카오 로그인 처리 중...</p>
    </main>
  );
}
