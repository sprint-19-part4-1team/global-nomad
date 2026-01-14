import type { ReactNode } from 'react';

/**
 * ## 공통 children 타입
 *
 * @description
 * - React 컴포넌트에서 `children`을 props로 받는 경우 사용되는 공통 타입입니다.
 * - 컴포넌트의 구조적 자식 요소를 명시적으로 표현하기 위해 사용합니다.
 *
 * @example
 * ```ts
 * interface ModalProps extends WithChildren {
 *   title: string;
 * }
 * ```
 */
export interface WithChildren {
  children: ReactNode;
}

/**
 * ## 공통 메시지 응답 타입
 *
 * @description
 * - 서버 API에서 단순 메시지를 반환할 때 사용하는 공통 응답 타입입니다.
 * - 성공/실패 여부를 문자열 메시지로만 전달하는 경우에 사용됩니다.
 *
 * @usage
 * - 로그아웃 결과 응답
 * - 토큰 갱신 실패 응답
 * - 기타 상태 메시지만 필요한 API 응답
 *
 * @example
 * ```ts
 * return NextResponse.json<MessageResponse>({
 *   message: '로그아웃 되었습니다.',
 * });
 * ```
 */
export interface MessageResponse {
  message: string;
}
