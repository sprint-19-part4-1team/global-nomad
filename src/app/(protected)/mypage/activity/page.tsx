import MypageSectionHeader from '@/features/mypage/components/mypage-section-header/MypageSectionHeader';

export default function MypageActivity() {
  // TODO: 마이페이지 내 체험 관리 페이지 구현
  return (
    <>
      <MypageSectionHeader
        title='내 체험 관리'
        description={`체험을 등록하거나 수정 및 삭제가 가능합니다.
단, 체험 승인/대기 중일 때는 삭제를 할 수 없습니다.`}
        btn
      />
      <div className='mt-24 sm:mt-32'>마이페이지 내 체험 관리 페이지 구현</div>
      {/* TODO: float button 구현 */}
      <div className='fixed bottom-16 z-2 block sm:hidden'>float button</div>
    </>
  );
}
