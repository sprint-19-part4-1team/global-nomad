import { ReactNode } from 'react';
import Header from '@/shared/components/header/Header';
import BaseLayout from '@/shared/layout/BaseLayout';
import { User } from '@/shared/types/user.type';

interface ProtectedLayoutProps {
  children: ReactNode;
}

// 임시
const MOCK_USER: User = {
  createdAt: '2025-12-24T08:50:57.848Z',
  email: 'test@example.com',
  id: 1,
  nickname: '테스트',
  profileImageUrl: null,
  updatedAt: '2025-12-24T08:50:57.848Z',
} as const;

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  // TODO: 추후 회원가입/로그인 구현시 추가
  // const 유저정보가져오는 로직=''
  // const 유저정보가 없으면 로그인 필요하다는 모달 보여주고 login페이지로 리다이렉트하는 로직

  return (
    <>
      <BaseLayout header={<Header isLoggedIn user={MOCK_USER} />}>{children}</BaseLayout>
    </>
  );
}
