'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import Dialog from '@/shared/components/overlay/dialog/Dialog';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import { useUserStore } from '@/shared/stores/userStore';

const OVERLAY_ID = 'auth-guard-already-logged-in';
const AUTH_GUARD_REDIRECT_DELAY_MS = 1500;

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * ## AuthGuard
 *
 * @description
 * - 로그인 상태인 사용자가 **로그인 / 회원가입 페이지**에 접근하는 것을 방지하기 위한 가드 컴포넌트입니다.
 * - 사용자가 이미 로그인된 상태에서 해당 페이지에 진입할 경우,
 *   안내용 모달(Dialog)을 표시한 뒤 특정 경로로 이동시킵니다.
 *
 * @behavior
 * - `user`가 존재하지 않으면(비로그인 상태) 자식 컴포넌트를 그대로 렌더링합니다.
 * - `user`가 존재하면(로그인 상태)
 *   1. 안내 모달을 오버레이로 표시합니다.
 *   2. 모달 닫기 시 오버레이를 제거하고 지정된 경로로 이동합니다.
 *
 * @param children
 * - 로그인 또는 회원가입 페이지 콘텐츠
 *
 * @example
 * ```tsx
 * export default function LoginPage() {
 *   return (
 *     <AuthGuard>
 *       <LoginForm />
 *     </AuthGuard>
 *   );
 * }
 * ```
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { user, hasHydrated } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      hasHydrated: state.hasHydrated,
    }))
  );

  useEffect(() => {
    if (!user) {
      return;
    }

    if (overlayStore.has(OVERLAY_ID)) {
      return;
    }

    overlayStore.push(
      <Dialog
        message='이미 로그인된 계정입니다.'
        autoCloseAfterMs={AUTH_GUARD_REDIRECT_DELAY_MS}
        onClose={() => {
          overlayStore.popById(OVERLAY_ID);
          router.replace('/');
        }}
      />,
      OVERLAY_ID
    );

    return () => {
      overlayStore.popById(OVERLAY_ID);
    };
  }, [user, router]);

  if (user || !hasHydrated) {
    return null;
  }

  return <>{children}</>;
}
