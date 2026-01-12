'use client';

import { useEffect } from 'react';
import Dialog from '@/shared/components/overlay/dialog/Dialog';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';

/**
 * ## usePreventNavigation
 *
 * @description
 * - 폼에 변경 사항이 있을 경우(`isDirty === true`),
 *   사용자의 의도치 않은 페이지 이탈을 방지하는 커스텀 훅입니다.
 * - 새로고침/창 닫기, 내부 링크 이동, 브라우저 뒤로가기를 가로채어 확인 다이얼로그를 노출합니다.
 *
 * @param isDirty - 폼에 변경 사항이 있는지 여부
 *
 * @remarks
 * - 내부 이동과 브라우저 기본 네비게이션을 모두 제어하기 위해
 *   `beforeunload`, `click`, `popstate` 이벤트를 함께 사용합니다.
 * - 사용자가 이동을 확정한 경우, 모든 가드를 해제한 뒤 실제 네비게이션을 수행합니다.
 * - 본 훅은 클라이언트 환경에서만 동작합니다.
 */
export const usePreventNavigation = (isDirty: boolean) => {
  useEffect(() => {
    if (!isDirty) {
      return;
    }

    /** 새로고침/창 닫기 방지  */
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    /** 내부 링크 클릭 방지 */
    const handleAnchorClick = (e: MouseEvent) => {
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
              window.removeEventListener('beforeunload', handleBeforeUnload);
              overlayStore.pop();
              location.href = anchor.href;
            }}
            onCancel={() => overlayStore.pop()}
          />
        );
      }
    };

    /** 브라우저 뒤로가기 방지 */
    const handlePopState = () => {
      history.pushState(null, '', location.href);

      overlayStore.push(
        <Dialog
          variant='confirm'
          message={
            <>
              작성 중인 내용이 사라집니다. <br /> 정말 뒤로 가시겠습니까?
            </>
          }
          confirmLabel='뒤로가기'
          onConfirm={() => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);

            overlayStore.pop();
            // 가짜 스택을 건너뛰고 이전 페이지로 이동
            history.go(-2);
          }}
          onCancel={() => {
            overlayStore.pop();
          }}
        />
      );
    };

    // 초기 방어용 스택 쌓기
    history.pushState(null, '', location.href);

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('click', handleAnchorClick, true);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('click', handleAnchorClick, true);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isDirty]);
};
