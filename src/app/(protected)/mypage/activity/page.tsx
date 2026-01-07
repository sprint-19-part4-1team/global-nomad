import ExperienceCard from '@/features/mypage/activity/ExperienceCard/ExperienceCard';
import MypageSectionHeader from '@/features/mypage/common/components/mypage-section-header/MypageSectionHeader';
import Button from '@/shared/components/button/Button';

export default function MypageActivity() {
  return (
    <>
      <MypageSectionHeader
        title='내 체험 관리'
        description={`체험을 등록하거나 수정 및 삭제가 가능합니다.
단, 체험 승인/대기 중일 때는 삭제를 할 수 없습니다.`}
        btn
      />
      <div className='mt-24 sm:mt-32'>
        <ul>
          <li className='mt-20 sm:mt-24'>
            <ExperienceCard
              id={123}
              title='제목'
              rating={3.2}
              price={11223}
              reviewCount={3}
              bannerImageUrl=''
            />
          </li>
          <li className='mt-20 sm:mt-24'>
            <ExperienceCard
              id={123}
              title='제목'
              rating={3.2}
              price={11223}
              reviewCount={3}
              bannerImageUrl=''
            />
          </li>
          <li className='mt-20 sm:mt-24'>
            <ExperienceCard
              id={123}
              title='제목'
              rating={3.2}
              price={11223}
              reviewCount={3}
              bannerImageUrl=''
            />
          </li>
        </ul>
      </div>
      <Button
        full
        href='/activity/new'
        size='lg'
        className='fixed bottom-16 z-2 block w-full max-w-[calc(100%-48px)] sm:hidden'>
        체험 등록하기
      </Button>
    </>
  );
}
