'use client';

import Icons from '@/assets/icons';

export default function Error() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <Icons.SurprisedEarth className='h-500 w-500' />
      <span className='heading-20 font-medium'>500 | 서버 오류가 발생했습니다.</span>
    </div>
  );
}
