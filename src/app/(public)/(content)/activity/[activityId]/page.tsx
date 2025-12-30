import { layoutContainer } from '@/shared/constants/';

export default function ActivityDetail() {
  return (
    <main
      className={layoutContainer({
        maxWidth: 1200,
        paddingX: 'wide',
        paddingTop: 'lg',
      })}>
      체험 상세 페이지
    </main>
  );
}
