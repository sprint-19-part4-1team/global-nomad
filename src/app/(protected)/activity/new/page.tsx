import ActivityNewClient from '@/features/activity-form/new/ActivityNewClient';
import Title from '@/shared/components/title/Title';

// TODO: 체험 등록 페이지 구현
export default function ActivityNew() {
  return (
    <>
      <Title responsive='md'>내 체험 등록</Title>
      <ActivityNewClient />
    </>
  );
}
