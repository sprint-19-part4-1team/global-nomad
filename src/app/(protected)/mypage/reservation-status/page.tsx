import MypageSectionHeader from '@/features/mypage/common/components/mypage-section-header/MypageSectionHeader';
import ReservationSelector from '@/features/mypage/reservation-status/components/ReservationSelector';

export default function MypageReservationStatus() {
  return (
    <section>
      <MypageSectionHeader
        title='예약 현황'
        description='내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.'
      />
      <div className='mt-24 sm:mt-32'>
        <ReservationSelector />
      </div>
    </section>
  );
}
