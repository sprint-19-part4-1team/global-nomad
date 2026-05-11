'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import Icons from '@/assets/icons';
import Button from '@/shared/components/button/Button';
import '@/shared/styles/globals.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang='ko'>
      <body>
        <div className='flex min-h-screen flex-col items-center justify-center'>
          <Icons.SurprisedEarth className='h-300 w-300' aria-hidden='true' />
          <div className='flex flex-col items-center justify-center gap-20'>
            <span className='heading-20 font-medium'>500 | 서버 오류가 발생했습니다.</span>
            <Button variant='primary' onClick={reset}>
              다시 시도
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
