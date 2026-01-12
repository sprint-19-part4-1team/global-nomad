import type { ActivityCategory } from '@/shared/constants';

/**
 * ### BasicInfo
 *
 * @description
 * 체험(Activity)의 기본 정보를 표현하는 폼 데이터 타입입니다.
 */
export interface BasicInfo {
  /** 체험 제목 */
  title: string;
  /** 체험 카테고리, 선택되지 않은 경우 빈 문자열 */
  category: ActivityCategory | '';
  /** 체험 가격 (클라이언트에서는 문자열로 관리) */
  price: string;
  /** 체험 상세 설명 */
  description: string;
}
