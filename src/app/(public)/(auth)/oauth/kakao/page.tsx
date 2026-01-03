'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { bffFetch } from '@/shared/apis/base/bffFetch';

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
 * 카카오 OAuth 콜백 페이지.
 * @description
 * - 쿼리의 `code`, `state`를 파싱한다.
 * - `state`에 따라 회원가입/로그인을 요청한다.
 * - 이미 가입된 사용자는 로그인 authorize로 재시도한다.
 * @returns `카카오 로그인 처리 중...` 문구
 */
export default function KakaoOauthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasProcessedRef = useRef(false);

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
          await bffFetch('/oauth/sign-up/kakao', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nickname: generateTempNickname(),
              token: code,
            }),
          });

          router.replace('/');
          return;
        }

        await bffFetch('/oauth/sign-in/kakao', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: code }),
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
  }, [router, searchParams]);

  return (
    <main className='flex min-h-[60vh] items-center justify-center'>
      <p className='body-20 font-semibold text-gray-700'>카카오 로그인 처리 중...</p>
    </main>
  );
}
