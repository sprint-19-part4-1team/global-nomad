'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { bffFetch } from '@/shared/apis/base/bffFetch';

type Mode = 'signin' | 'signup';

const makeTempNickname = () => {
  const rand = Math.random().toString(36).slice(2, 8);
  return `kakao_${rand}`;
};

export default function KakaoOauthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const didRunRef = useRef(false);

  useEffect(() => {
    // React StrictMode(dev)에서 useEffect가 2번 실행될 수 있어서 1회만 실행하도록 방지
    if (didRunRef.current) {
      return;
    }
    didRunRef.current = true;

    const code = searchParams.get('code');
    const state = (searchParams.get('state') as Mode | null) ?? 'signin';

    const error = searchParams.get('error');
    if (error) {
      router.replace('/login?oauth=failed');
      return;
    }

    if (!code) {
      router.replace('/login?oauth=missing_code');
      return;
    }

    (async () => {
      try {
        if (state === 'signup') {
          await bffFetch('/oauth/sign-up/kakao', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nickname: makeTempNickname(),
              token: code,
            }),
          });

          router.replace('/login?oauth=signup_success');
          return;
        }

        await bffFetch('/oauth/sign-in/kakao', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: code }),
        });

        router.replace('/');
      } catch {
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
      <p className='body-16 text-gray-700'>카카오 로그인 처리 중...</p>
    </main>
  );
}
