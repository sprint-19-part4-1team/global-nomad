import {
  ActivityCommonKey,
  ActivityRequestData,
} from '@/features/activity-form/common/types/activityFormType';
import { ActivityWithSubImagesAndSchedulesDto } from '@/shared/types/activities';
import { UpdateActivityFormPayload } from '@/shared/types/myActivities';

/**
 * ## applyChanges
 * @description
 * 두 객체의 특정 키값을 비교하여 변경된 항목만 target 객체에 할당합니다.
 *
 * @param keys - 비교할 공통 키 배열 (readonly)
 * @param source - 현재 폼의 데이터 (reqbody)
 * @param base - 비교 대상인 초기 데이터 (initialData)
 * @param target - 변경사항을 담을 결과 객체 (changedValues)
 */
export const applyChanges = (
  keys: readonly ActivityCommonKey[],
  source: ActivityRequestData,
  base: ActivityWithSubImagesAndSchedulesDto,
  target: UpdateActivityFormPayload
) => {
  keys.forEach((key) => {
    if (source[key] !== base[key]) {
      (target as any)[key] = source[key];
    }
  });
};
