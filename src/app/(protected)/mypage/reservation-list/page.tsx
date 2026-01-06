import MypageSectionHeader from '@/features/mypage/components/mypage-section-header/MypageSectionHeader';
import ReservationStatus from '@/features/mypage/reservation-list/components/reservation-status/ReservationStatus';

export default function MypageReservationList() {
  // TODO: 마이페이지 예약 내역 리스트 페이지 구현
  return (
    <>
      <MypageSectionHeader title='예약 내역' description='체험 예약을 변경/취소할 수 있습니다.' />
      <section className='my-24 w-full bg-gray-25 sm:my-32'>
        {/* TODO: 예약 내역 표시 영역 UI 구현 */}예약 내역 표시 영역
        <ReservationStatus status='confirmed' />
      </section>
      <section className='h-full w-full bg-gray-25'>
        {/* TODO: 예약 내역 카드 표시 */}
        예약 내역 카드 표시 영역
      </section>
    </>
  );
}
