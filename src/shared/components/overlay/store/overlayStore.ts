import { ReactNode } from 'react';

/**
 * Overlay 아이템 타입
 *
 * @description
 * - OverlayRoot에서 렌더링되는 단일 overlay 단위입니다.
 * - `id`는 overlay를 개별적으로 제어하기 위한 식별자입니다.
 * - `element`는 실제로 렌더링될 ReactNode(Dialog, Sheet 등)입니다.
 */
interface OverlayType {
  id: string;
  element: ReactNode;
}

/**
 * 현재 열려 있는 overlay 목록
 *
 * @remarks
 * - overlayStore를 통해서만 변경됩니다.
 */
let overlays: OverlayType[] = [];

/**
 * overlay 상태 변경을 구독하는 리스너 목록
 *
 * @remarks
 * - `useSyncExternalStore`에서 전달한 subscribe 콜백이 여기에 등록됩니다.
 */
let listeners: (() => void)[] = [];

/**
 * overlay 상태 변경을 모든 구독자에게 알리는 함수
 */
const emitChange = () => {
  for (const listener of listeners) {
    listener();
  }
};

/**
 * 현재 overlay 상태 스냅샷을 반환하는 함수
 *
 * @remarks
 * - `useSyncExternalStore`에서 사용하는 getter입니다.
 */
const getSnapshot = () => {
  return overlays;
};

/**
 * overlay 상태 변경을 구독하는 함수
 *
 * @param listener - 상태 변경 시 호출될 콜백
 * @returns 구독 해제 함수
 *
 * @remarks
 * - React 컴포넌트(OverlayRoot)가 이 함수를 통해 store를 구독합니다.
 * - 반환된 cleanup 함수는 컴포넌트 unmount 시 호출됩니다.
 */
const subscribe = (listener: () => void) => {
  listeners = [...listeners, listener];

  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

/**
 * 새로운 overlay를 스택에 추가합니다.
 *
 * @param element - 렌더링할 overlay ReactNode
 * @param id - overlay를 식별하기 위한 고유 id (선택)
 * @returns`string` - 생성된 overlay id
 *
 * @example
 * ```ts
 * // overlay 트리거 버튼에 onClick 함수를 연결하면 됩니다.
 * const handleClick = () => {
 *   // 띄워야 할 overlay가 하나라면 간단하게 사용할 수 있습니다.
 *   overlayStore.push(<Dialog message='로그인이 필요합니다.' onClose={() => overlayStore.pop()} />);
 *  };
 * // overlay를 여러 개 띄워야 한다면 id로 관리할 수 있습니다.
 * const handleClick = () => {
 *   overlayStore.push(
 *     <Dialog
 *       variant='confirm'
 *       message='뒤로가시겠습니까?'
 *       confirmLabel='뒤로가기'
 *       // 안닫힘
 *       onConfirm={() => overlayStore.popById('id를 다르게 하면?')}
 *        // 닫힘
 *       onCancel={() => overlayStore.popById('원하는id')}
 *     />,
 *     '원하는id'
 *   );
 * };
 * ```
 */
const push = (element: ReactNode, id = crypto.randomUUID()): string => {
  overlays = [...overlays, { id, element }];
  emitChange();
  return id;
};

/**
 * 가장 마지막에 열린 overlay를 닫습니다.
 *
 * @remarks
 * - overlay 스택 구조에서 "pop" 역할을 합니다.
 */
const pop = () => {
  overlays = overlays.slice(0, -1);
  emitChange();
};

/**
 * 특정 id를 가진 overlay를 닫습니다.
 *
 * @param id - 닫을 overlay의 id
 */
const popById = (id: string) => {
  overlays = overlays.filter((o) => o.id !== id);
  emitChange();
};

/**
 * 모든 overlay를 닫습니다.
 */
const clear = () => {
  overlays = [];
  emitChange();
};

/**
 * ## overlayStore
 *
 * @description
 * - 앱 전역에서 overlay(Dialog, BottomSheet 등)를 관리하는 store입니다.
 * - React 외부 상태 패턴을 사용합니다.
 * - `useSyncExternalStore`와 함께 사용되어 React와 동기화됩니다.
 */
export const overlayStore = {
  subscribe,
  getSnapshot,
  push,
  pop,
  popById,
  clear,
};
