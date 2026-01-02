import Title from '@/shared/components/title/Title';

export default function MypageInfo() {
  // TODO: 마이페이지 내 정보 수정 페이지 구현
  return (
    <>
      <div>
        <Title size='18' className='font-size text-gray-950 sm:heading-20 md:heading-24'>
          내 정보
        </Title>
        <p className='mt-10 font-medium text-gray-600'>닉네임과 비밀번호를 수정할 수 있습니다.</p>
      </div>
      <div className='mt-24 sm:mt-32'>마이페이지 내 정보 수정 페이지</div>
    </>
  );
}
