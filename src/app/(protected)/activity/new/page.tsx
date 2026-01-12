import { Metadata } from 'next';
import CreateActivityForm from '@/features/activity-form/new/CreateActivityForm';
import Title from '@/shared/components/title/Title';

export const metadata: Metadata = {
  title: '내 체험 등록',
};

export default function ActivityNew() {
  return (
    <>
      <Title responsive='md'>내 체험 등록</Title>
      <CreateActivityForm />
    </>
  );
}
