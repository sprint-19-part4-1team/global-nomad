import MypageSectionHeader from '@/features/mypage/components/mypage-section-header/MypageSectionHeader';
import ChangePasswordSection from '@/features/mypage/info/components/change-password/ChangePasswordSection';

export default function MypageInfo() {
  // TODO: 마이페이지 내 정보 수정 페이지 구현
  return (
    <>
      <section>
        <MypageSectionHeader
          title='내 정보'
          description='닉네임과 비밀번호를 수정할 수 있습니다.'
        />
        <div className='mt-32 h-268 w-full bg-gray-25'>
          {/* TODO: 내 정보 수정 영역 UI 구현 */}내 정보 수정 영역
        </div>
      </section>
      <ChangePasswordSection />
    </>
  );
}
