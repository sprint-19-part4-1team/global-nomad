import {
  ActivityCommonKey,
  ActivityRequestData,
} from '@/features/activity-form/common/types/activityFormType';
import {
  ActivityWithSubImagesAndSchedulesDto,
  DetailSchedulesType,
  ScheduleTimeSlot,
  SubImagesType,
} from '@/shared/types/activities';
import { UpdateActivityFormPayload } from '@/shared/types/myActivities';

/**
 * ## getBasicFieldsDiff
 *
 * @description
 * 두 객체의 특정 키값을 비교하여 변경된 항목만 target 객체에 할당합니다.
 *
 * @param keys - 비교할 공통 키 배열 (readonly)
 * @param source - 현재 폼의 데이터 (reqbody)
 * @param base - 비교 대상인 초기 데이터 (initialData)
 * @param target - 변경사항을 담을 결과 객체 (changedValues)
 */
export const getBasicFieldsDiff = (
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

/**
 * ## getSubImageDiff
 *
 * @description
 * - 현재 소개 이미지 목록과 기존 서브 이미지 목록을 비교하여
 *   삭제할 이미지 ID와 추가할 이미지 파일 목록을 반환합니다.
 *
 * @param currentIntroImages - 현재 폼에 존재하는 소개 이미지 목록 (URL 또는 File)
 * @param baseSubImages - 기존에 저장된 서브 이미지 목록
 *
 * @returns
 * - subImageIdsToRemove: 삭제할 기존 서브 이미지 ID 배열
 * - subImageUrlsToAdd: 새로 추가할 서브 이미지 파일 배열
 */
export const getSubImageDiff = (
  currentIntroImages: (string | File)[],
  baseSubImages: SubImagesType[]
) => {
  const currentSubUrls = currentIntroImages.filter(
    (item): item is string => typeof item === 'string'
  );

  const subImageIdsToRemove = baseSubImages
    .filter((oldImg) => !currentSubUrls.includes(oldImg.imageUrl))
    .map((oldImg) => oldImg.id);

  const subImageUrlsToAdd = currentIntroImages.filter((item): item is File => item instanceof File);

  return { subImageIdsToRemove, subImageUrlsToAdd };
};

/**
 * # getScheduleKey
 *
 * @description
 * 스케줄 객체를 식별 가능한 문자열 키로 변환하는 함수
 *
 * @param s - 타임 슬롯 객체
 * @returns - 문자열로 변환한 객체
 */
const getScheduleKey = (s: ScheduleTimeSlot) => {
  return `${s.date}_${s.startTime}_${s.endTime}`;
};

/**
 * ## getScheduleDiff
 *
 * @description
 * - 현재 폼의 예약 일정 목록과 기존 일정 목록을 비교하여
 *   삭제할 일정 ID와 새로 추가할 일정 데이터를 반환합니다.
 *
 * @param currentSchedules - 현재 폼에 입력된 예약 일정 목록
 * @param baseSchedules - 기존에 저장된 예약 일정 목록
 *
 * @returns
 * - scheduleIdsToRemove: 삭제할 기존 일정 ID 배열
 * - schedulesToAdd: 새로 추가할 예약 일정 데이터 배열
 */
export const getScheduleDiff = (
  currentSchedules: ScheduleTimeSlot[],
  baseSchedules: DetailSchedulesType[]
) => {
  const currentKeys = currentSchedules.map(getScheduleKey);
  const oldKeys = baseSchedules.map(getScheduleKey);

  const scheduleIdsToRemove = baseSchedules
    .filter((old) => !currentKeys.includes(getScheduleKey(old)))
    .map((old) => old.id);

  const schedulesToAdd = currentSchedules
    .filter((curr) => !oldKeys.includes(getScheduleKey(curr)))
    .map((s) => ({
      date: s.date,
      startTime: s.startTime,
      endTime: s.endTime,
    }));

  return { scheduleIdsToRemove, schedulesToAdd };
};
