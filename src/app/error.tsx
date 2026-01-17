'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Icons from '@/assets/icons';
import Button from '@/shared/components/button/Button';
import { ERROR_FAVICON_PATH } from '@/shared/constants';

/**
 * @description
 * - 렌더링 중 발생한 런타임 에러를 처리하는 500 에러 페이지입니다.
 * - Next.js의 Error Boundary로 동작하며, 에러 발생 시 fallback UI를 렌더링합니다.
 *
 * @param reset
 * - Error Boundary 상태를 초기화하고
 *   해당 세그먼트를 다시 렌더링하기 위한 함수.
 * - Next.js에서 제공
 */
export default function Error({ reset }: { reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    document.title = '500 - Internal Server Error';

    const link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    const originalHref = link?.href;

    if (link) {
      link.href = ERROR_FAVICON_PATH;
    }

    return () => {
      if (link && originalHref) {
        link.href = originalHref;
      }
    };
  }, []);

  const handleRetry = () => {
    router.refresh();
    reset();
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <Icons.SurprisedEarth className='h-300 w-300' aria-hidden='true' />
      <div className='flex flex-col items-center justify-center gap-20'>
        <span className='heading-20 font-medium'>500 | 서버 오류가 발생했습니다.</span>
        <Button variant='primary' onClick={handleRetry}>
          다시 시도
        </Button>
      </div>
    </div>
  );
}
