import MypageSectionHeader from '@/features/mypage/components/mypage-section-header/MypageSectionHeader';

export default function MypageInfo() {
  // TODO: 마이페이지 내 정보 수정 페이지 구현
  return (
    <>
      <MypageSectionHeader title='내 정보' description='닉네임과 비밀번호를 수정할 수 있습니다.' />
      <div className='mt-24 sm:mt-32'>마이페이지 내 정보 수정 페이지</div>
    </>
  );
}
