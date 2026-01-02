import { ReactNode } from 'react';
import MypageTabs from '@/features/mypage/components/MypageTabs';
import Sidemenu from '@/features/mypage/components/sidemenu/Sidemenu';
import { layoutContainer } from '@/shared/constants/';

interface MypageLayoutProps {
  children: ReactNode;
}

/* TODO: user 연결 */
export default function MypageLayout({ children }: MypageLayoutProps) {
  return (
    <main
      className={layoutContainer({
        maxWidth: 980,
        paddingX: 'lgOnlyNone',
        paddingTop: 'lg',
      })}>
      <div className='fixed top-48 left-0 z-6 w-full bg-white'>
        <MypageTabs />
      </div>
      <div className='flex gap-0 pt-48 sm:gap-30 sm:pt-0 md:gap-48'>
        <Sidemenu
          user={{
            createdAt: '2025-12-24T08:50:57.848Z',
            email: 'test@example.com',
            id: 1,
            nickname: '테스트',
            profileImageUrl: null,
            updatedAt: '2025-12-24T08:50:57.848Z',
          }}
        />
        <div className='w-full flex-1 border-2'>{children}</div>
      </div>
    </main>
  );
}
