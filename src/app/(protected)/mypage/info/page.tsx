import ChangePasswordSection from '@/features/mypage/info/components/change-password/ChangePasswordSection';
import ProfileSection from '@/features/mypage/info/components/profile/ProfileSection';

export default async function MypageInfo() {
  return (
    <>
      <ProfileSection />
      <ChangePasswordSection />
    </>
  );
}
