'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Dialog from '@/shared/components/overlay/dialog/Dialog';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import { useNavigationStore } from '@/shared/stores/navigationStore';

/**
 * ## usePreventNavigation
 *
 * @description
 * - 폼에 변경 사항이 있을 경우(`isDirty === true`),
 *   사용자의 의도치 않은 페이지 이탈을 방지하는 커스텀 훅입니다.
 * - 새로고침/창 닫기, 내부 링크 이동, 브라우저 뒤로가기를 가로채어 확인 다이얼로그를 노출합니다.
 * - 폼 변경 사항이 있을 때 이탈을 방지하며, Zustand 스토어에 기록된 '이전 URL'을 기반으로 안전하게 이동합니다.
 *
 * @param isDirty - 폼에 변경 사항이 있는지 여부
 */
export const usePreventNavigation = (isDirty: boolean) => {
  const router = useRouter();
  const { getPreviousUrl } = useNavigationStore();

  const isDirtyRef = useRef(isDirty);
  /** isDirty 최신 값 유지 */
  isDirtyRef.current = isDirty;

  useEffect(() => {
    if (!isDirty) {
      return;
    }

    if (history.state.blocked !== 'true') {
      history.pushState({ blocked: true }, '', location.href);
    }
  }, [isDirty]);

  useEffect(() => {
    /** 새로고침/창 닫기 방지 */
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirtyRef.current) {
        return;
      }
      e.preventDefault();
    };

    /** 내부 링크 클릭 방지 */
    const handleAnchorClick = (e: MouseEvent) => {
      if (!isDirtyRef.current) {
        return;
      }

      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href.startsWith(location.origin) && !anchor.target) {
        e.preventDefault();

        overlayStore.push(
          <Dialog
            variant='confirm'
            message={
              <>
                작성 중인 내용이 사라집니다. <br /> 정말 나가시겠습니까?
              </>
            }
            confirmLabel='이동하기'
            onConfirm={() => {
              isDirtyRef.current = false;
              overlayStore.pop();
              router.push(anchor.href);
            }}
            onCancel={() => overlayStore.pop()}
          />
        );
      }
    };

    /** 브라우저 뒤로가기 방지 */
    const handlePopState = () => {
      const targetUrl = getPreviousUrl();

      /** 클린 상태면 즉시 이전 페이지로 이동 */
      if (!isDirtyRef.current) {
        setTimeout(() => {
          router.push(targetUrl);
        }, 0);
        return;
      }

      setTimeout(() => {
        overlayStore.push(
          <Dialog
            variant='confirm'
            message={
              <>
                작성 중인 내용이 사라집니다. <br />
                정말 뒤로 가시겠습니까?
              </>
            }
            confirmLabel='뒤로가기'
            onConfirm={() => {
              isDirtyRef.current = false;
              overlayStore.pop();
              router.push(targetUrl);
            }}
            onCancel={() => {
              overlayStore.pop();
              history.pushState({ blocked: true }, '', location.href);
            }}
          />
        );
      }, 0);
    };

    addEventListener('beforeunload', handleBeforeUnload);
    addEventListener('click', handleAnchorClick, true);
    addEventListener('popstate', handlePopState);

    return () => {
      removeEventListener('beforeunload', handleBeforeUnload);
      removeEventListener('click', handleAnchorClick, true);
      removeEventListener('popstate', handlePopState);
    };
  }, [router, getPreviousUrl]);
};
