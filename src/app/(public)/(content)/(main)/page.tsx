import BannerSlide from '@/shared/components/slide/BannerSlide';
import PopularSlide from '@/shared/components/slide/PopularSlide';
import { layoutContainer } from '@/shared/constants/';

export default function Home() {
  return (
    <main
      className='min-h-[calc(100dvh-130px-80px)] sm:min-h-[calc(100dvh-146px-100px)] lg:min-h-[calc(100dvh-146px-180px)]'
      style={{
        background:
          'url("/cloud.png") center top /cover no-repeat, linear-gradient(180deg, rgba(201, 228, 255, 1) 0%, rgba(228, 241, 255, 1) 29%, rgba(254, 254, 255, 1) 100%)',
      }}>
      <div
        className={layoutContainer({
          maxWidth: 1200,
          paddingX: 'wide',
          paddingTop: 'md',
        })}>
        메인 내용
        <BannerSlide />
        <div className='h-40' />
        <PopularSlide slides={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
      </div>
    </main>
  );
}
