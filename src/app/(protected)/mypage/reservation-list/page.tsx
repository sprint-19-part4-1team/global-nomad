import Title from '@/shared/components/title/Title';

export default function MypageReservationList() {
  // TODO: 마이페이지 예약 내역 리스트 페이지 구현
  return (
    <>
      <div>
        <Title size='18' className='font-size text-gray-950 sm:heading-20 md:heading-24'>
          예약 내역
        </Title>
        <p className='mt-10 font-medium text-gray-600'>체험 예약을 변경/취소할 수 있습니다.</p>
      </div>
      <div className='mt-24 sm:mt-32'>마이페이지 예약 내역 리스트 페이지</div>
      {/* TODO: float button 구현 */}
      <div>float button</div>
    </>
  );
}
