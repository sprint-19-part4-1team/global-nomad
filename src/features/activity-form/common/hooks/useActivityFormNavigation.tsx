import { useRouter } from 'next/navigation';
import Dialog from '@/shared/components/overlay/dialog/Dialog';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import { useNavigationStore } from '@/shared/stores/navigationStore';
import { usePreventNavigation, NavigationType } from './usePreventNavigation';

/**
 * 네비게이션 유형별로 노출할 Confirm Dialog UI 설정
 *
 * - POPSTATE: 브라우저 뒤로가기/앞으로가기
 * - ANCHOR_CLICK: 내부 링크 클릭
 */
const NAVIGATION_UI_CONFIG = {
  POPSTATE: {
    message: (
      <>
        작성 중인 내용이 사라집니다. <br /> 정말 뒤로 가시겠습니까?
      </>
    ),
    confirmLabel: '뒤로가기',
  },
  ANCHOR_CLICK: {
    message: (
      <>
        작성 중인 내용이 사라집니다. <br /> 정말 나가시겠습니까?
      </>
    ),
    confirmLabel: '이동하기',
  },
} as const;

/**
 * ## useActivityFormNavigation
 *
 * @description
 * - 체험(Activity) 작성/수정 폼에서 이탈 방지 네비게이션 제어를 담당하는 훅입니다.
 * - 사용자가 작성 중(isDirty === true)일 때
 *   - 브라우저 뒤로가기(POPSTATE)
 *   - 내부 링크 이동(ANCHOR_CLICK)를 시도하면 Confirm Dialog를 노출합니다.
 *
 * @param isDirty
 * - 폼에 변경 사항이 있는지 여부
 * - true일 경우 네비게이션 차단 로직이 활성화됩니다.
 */
export const useActivityFormNavigation = (isDirty: boolean) => {
  const router = useRouter();
  const { getPreviousUrl } = useNavigationStore();

  usePreventNavigation({
    isDirty,

    onNavigate: () => {
      const targetUrl = getPreviousUrl();
      router.push(targetUrl);
    },

    onPrevent: (type: NavigationType, targetUrl?: string) => {
      const { message, confirmLabel } = NAVIGATION_UI_CONFIG[type];
      const finalUrl = targetUrl || getPreviousUrl();

      overlayStore.push(
        <Dialog
          variant='confirm'
          message={message}
          confirmLabel={confirmLabel}
          onConfirm={() => {
            overlayStore.pop();
            router.push(finalUrl);
          }}
          onCancel={() => {
            overlayStore.pop();
            if (type === 'POPSTATE') {
              history.pushState({ blocked: true }, '', window.location.href);
            }
          }}
        />
      );
    },
  });
};
