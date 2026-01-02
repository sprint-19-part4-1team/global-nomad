import Title from '@/shared/components/title/Title';

export default function MypageReservationStatus() {
  // TODO: 마이페이지 예약 현황 페이지
  return (
    <>
      <div>
        <Title size='18' className='font-size text-gray-950 sm:heading-20 md:heading-24'>
          예약 현황
        </Title>
        <p className='mt-10 font-medium text-gray-600'>
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </p>
      </div>
      <div className='mt-24 sm:mt-32'>마이페이지 예약 현황 페이지</div>
    </>
  );
}
