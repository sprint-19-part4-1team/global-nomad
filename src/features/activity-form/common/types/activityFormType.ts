import type { ActivityCategory } from '@/shared/constants';
import {
  ActivityWithSubImagesAndSchedulesDto,
  CreateActivityBodyDto,
} from '@/shared/types/activities';
import { UpdateMyActivityBodyDto } from '@/shared/types/myActivities';

/**
 * ## BasicInfo
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

/**
 * ## CreateActivityFormPayload
 *
 * @description
 * - 체험(Activity) 등록 API에 전달되는 요청 데이터 타입입니다.
 * - 이미지 업로드 전 단계의 데이터 구조로,
 *   이미지 필드는 `File` 또는 임시 URL 형태를 포함할 수 있습니다.
 *
 * @remarks
 * - 실제 API 요청 시에는 이미지 파일이 서버에 업로드된 후
 *   URL로 변환되어 전달됩니다.
 * - 본 타입은 폼 레벨과 API 레벨 사이의 중간 데이터 타입으로 사용됩니다.
 */
export interface CreateActivityFormPayload extends Omit<
  CreateActivityBodyDto,
  'bannerImageUrl' | 'subImageUrls'
> {
  bannerImageUrl: string | File | null;
  subImageUrls: (string | File)[];
}

/**
 * ## UpdateActivityFormPayload
 *
 * @description
 * - 체험(Activity) 수정 API에 전달되는 요청 데이터 타입입니다.
 * - 이미지 업로드 전 단계의 데이터 구조로,
 *   이미지 필드는 `File` 또는 임시 URL 형태를 포함할 수 있습니다.
 *
 * @remarks
 * - 실제 API 요청 시에는 이미지 파일이 서버에 업로드된 후 URL로 변환되어 전달됩니다.
 * - 본 타입은 폼 레벨과 API 레벨 사이의 중간 데이터 타입으로 사용됩니다.
 */
export interface UpdateActivityFormPayload extends Omit<
  UpdateMyActivityBodyDto,
  'bannerImageUrl' | 'subImageUrlsToAdd'
> {
  bannerImageUrl?: string | File;
  subImageUrlsToAdd?: (string | File)[];
}

/**
 * ## ActivityCommonKey
 *
 * @description
 * - UpdateActivityFormPayload와 ActivityWithSubImagesAndSchedulesDto의 공통 키를 추출합니다.
 */
export type ActivityCommonKey = Extract<
  keyof UpdateActivityFormPayload,
  keyof ActivityWithSubImagesAndSchedulesDto
>;
