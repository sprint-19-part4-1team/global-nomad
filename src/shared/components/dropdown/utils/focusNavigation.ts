type FocusDirection = 'next' | 'prev';
type FocusEdge = 'first' | 'last';

/**
 * ## moveFocus
 *
 * @description
 * 현재 요소를 기준으로 형제 요소 간 포커스를 이동시키는 유틸 함수입니다.
 *
 * - `direction`에 따라 다음(`next`) 또는 이전(`prev`) 형제 요소로 이동합니다.
 * - `aria-disabled="true"`가 설정된 요소는 건너뜁니다.
 * - 이동 가능한 요소를 찾을 때까지 순차적으로 탐색합니다.
 * - 이동할 수 있는 요소가 없으면 아무 동작도 하지 않습니다.
 *
 * @param current
 * - 현재 포커스를 가지고 있는 HTMLElement
 *
 * @param direction
 * - 포커스 이동 방향 (`'next' | 'prev'`)
 *
 * @example
 * ```tsx
 * // ArrowDown
 * moveFocus(currentElement, 'next');
 *
 * // ArrowUp
 * moveFocus(currentElement, 'prev');
 * ```
 */
export const moveFocus = (current: HTMLElement, direction: FocusDirection) => {
  let target = direction === 'next' ? current.nextElementSibling : current.previousElementSibling;

  while (target) {
    if (target instanceof HTMLElement && target.getAttribute('aria-disabled') !== 'true') {
      target.focus();
      return;
    }

    target = direction === 'next' ? target.nextElementSibling : target.previousElementSibling;
  }
};

/**
 * ## moveToEdge
 *
 * @description
 * 현재 요소가 속한 컨테이너의 **처음 또는 마지막 요소**로 포커스를 이동시키는 유틸 함수입니다.
 *
 * - `direction`에 따라 첫 번째(`first`) 또는 마지막(`last`) 요소로 이동합니다.
 * - `aria-disabled="true"`가 설정된 요소는 건너뜁니다.
 * - 이동 가능한 요소를 찾을 때까지 순차적으로 탐색합니다.
 * - 부모 요소가 없거나 이동 가능한 요소가 없으면 아무 동작도 하지 않습니다.
 *
 * @param current
 * - 현재 포커스를 가지고 있는 HTMLElement
 *
 * @param direction
 * - 이동 위치 (`'first' | 'last'`)
 *
 * @example
 * ```tsx
 * // Home 키
 * moveToEdge(currentElement, 'first');
 *
 * // End 키
 * moveToEdge(currentElement, 'last');
 * ```
 */
export const moveToEdge = (current: HTMLElement, direction: FocusEdge) => {
  const parent = current.parentElement;
  if (!parent) {
    return;
  }

  let target = direction === 'first' ? parent.firstElementChild : parent.lastElementChild;

  while (target) {
    if (target instanceof HTMLElement && target.getAttribute('aria-disabled') !== 'true') {
      target.focus();
      return;
    }

    target = direction === 'first' ? target.nextElementSibling : target.previousElementSibling;
  }
};
