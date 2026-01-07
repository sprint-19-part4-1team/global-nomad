import ChangePasswordSection from '@/features/mypage/info/components/change-password/ChangePasswordSection';
import ProfileSection from '@/features/mypage/info/components/profile/ProfileSection';

/**
 * ## MypageInfo
 *
 * @description
 * - 마이페이지의 내 정보 수정 화면을 구성하는 페이지 컴포넌트입니다.
 * - 프로필 수정 섹션과 비밀번호 변경 섹션을 순서대로 렌더링합니다.
 */
export default async function MypageInfo() {
  return (
    <>
      <ProfileSection />
      <ChangePasswordSection />
    </>
  );
}
