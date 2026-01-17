'use client';

import MypageSectionHeader from '@/features/mypage/common/components/mypage-section-header/MypageSectionHeader';
import ChangePasswordForm from '@/features/mypage/info/components/change-password/ChangePasswordForm';
import { useUserStore } from '@/shared/stores/userStore';

/**
 * ## ChangePasswordSection
 *
 * @description
 * - 마이페이지 내 정보 수정에서 사용하는 비밀번호 변경 섹션입니다.
 * - 카카오 로그인 사용자는 해당 섹션을 보여주지 않습니다.
 */
export default function ChangePasswordSection() {
  const user = useUserStore((state) => state.user);
  const userEmail = user?.email;
  const isKaKaoLogin = userEmail?.includes('@kakao.com');

  if (isKaKaoLogin) {
    return null;
  }

  return (
    <section className='mt-40 sm:mt-48 md:mt-60'>
      <MypageSectionHeader
        title='비밀번호 변경'
        description={`변경할 비밀번호를 입력해 주세요.\n비밀번호는 8자 이상 영문 대/소문자를 포함해야 합니다.`}
      />
      <ChangePasswordForm userEmail={userEmail || ''} />
    </section>
  );
}
