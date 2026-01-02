import MypageSectionHeader from '@/features/mypage/components/mypage-section-header/MypageSectionHeader';

export default function MypageReservationStatus() {
  // TODO: 마이페이지 예약 현황 페이지
  return (
    <>
      <MypageSectionHeader
        title='예약 현황'
        description='내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.'
      />
      <div className='mt-24 sm:mt-32'>마이페이지 예약 현황 페이지</div>
    </>
  );
}
