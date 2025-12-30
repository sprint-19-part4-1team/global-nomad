export default function Home() {
  return (
    <div
      className='min-h-[calc(100dvh-130px-80px)] sm:min-h-[calc(100dvh-146px-100px)] lg:min-h-[calc(100dvh-146px-180px)]'
      style={{
        background:
          'url("/cloud.png") center top /cover no-repeat, linear-gradient(180deg, rgba(201, 228, 255, 1) 0%, rgba(228, 241, 255, 1) 29%, rgba(254, 254, 255, 1) 100%)',
      }}>
      <div className='mx-auto w-full max-w-1200 px-24 pt-68 sm:px-30 sm:pt-80 md:px-40 lg:pt-100'>
        메인 내용
      </div>
    </div>
  );
}
