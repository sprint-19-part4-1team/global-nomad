import MypageSectionHeader from '@/features/mypage/components/mypage-section-header/MypageSectionHeader';
import ProfileForm from '@/features/mypage/info/components/profile/ProfileForm';

/**
 * ## ProfileSection
 *
 * @description
 * - 마이페이지에서 내 정보(Profile) 영역을 구성하는 섹션 컴포넌트입니다.
 * - 섹션 헤더와 프로필 수정 폼(`ProfileForm`)을 함께 렌더링합니다.
 */
export default function ProfileSection() {
  return (
    <section>
      <MypageSectionHeader title='내 정보' description='닉네임과 비밀번호를 수정할 수 있습니다.' />
      <ProfileForm />
    </section>
  );
}
