'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { signInWithOauth } from '@/shared/apis/feature/oauth';

type Mode = 'signin' | 'signup';

export default function KakaoOauthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = (searchParams.get('state') as Mode | null) ?? 'signin';

    const error = searchParams.get('error');
    if (error) {
      router.replace(`/login?oauth=failed`);
      return;
    }

    if (!code) {
      router.replace(`/login?oauth=missing_code`);
      return;
    }

    const redirectUri = `${window.location.origin}/oauth/kakao`;

    // signup은 nickname이 필수라서 여기서 바로 회원가입 API를 치지 않고,
    // signup 페이지로 code를 넘겨서 닉네임 입력 후 sign-up을 호출하는 흐름을 추천
    if (state === 'signup') {
      router.replace(`/signup?oauthCode=${encodeURIComponent(code)}`);
      return;
    }

    (async () => {
      try {
        await signInWithOauth({
          redirectUri,
          token: code,
        });

        router.replace('/');
      } catch {
        router.replace(`/login?oauth=signin_failed&oauthCode=${encodeURIComponent(code)}`);
      }
    })();
  }, [router, searchParams]);

  return (
    <main className='flex min-h-[60vh] items-center justify-center'>
      <p className='body-16 text-gray-700'>카카오 로그인 처리 중...</p>
    </main>
  );
}
