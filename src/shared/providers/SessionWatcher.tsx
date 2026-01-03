'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { AUTH_CLIENT_MESSAGE } from '@/shared/constants';
import { useUserStore } from '@/shared/stores/userStore';

/**
 * ## SessionWatcher
 *
 * @description
 * - 전역 인증 상태(`user`) 변화를 감시하는 watcher 컴포넌트입니다.
 * - 로그인 상태에서 비로그인 상태로 전환되는 순간을 감지하여 사용자에게 자동 로그아웃 안내를 제공합니다.
 */
export default function SessionWatcher() {
  const router = useRouter();
  const { user, logoutReason } = useUserStore();
  const prevUserRef = useRef(user);

  useEffect(() => {
    if (prevUserRef.current && !user && logoutReason === 'expired') {
      toast.info(AUTH_CLIENT_MESSAGE.SESSION_EXPIRED);
    }

    prevUserRef.current = user;
  }, [user, router, logoutReason]);

  return null;
}
