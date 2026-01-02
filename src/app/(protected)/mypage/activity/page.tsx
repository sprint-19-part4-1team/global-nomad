import Title from '@/shared/components/title/Title';

export default function MypageActivity() {
  // TODO: 마이페이지 내 체험 관리 페이지 구현
  return (
    <>
      <div>
        <Title size='18' className='text-gray-950 sm:heading-20 md:heading-24'>
          내 체험 관리
        </Title>
        <p className='mt-10 font-medium text-gray-600'>
          체험을 등록하거나 수정 및 삭제가 가능합니다.
          <br />
          단, 체험 승인/대기 중일 때는 삭제를 할 수 없습니다.
        </p>
        버튼
      </div>
      <div className='mt-24 sm:mt-32'>마이페이지 내 체험 관리 페이지 구현</div>
    </>
  );
}
