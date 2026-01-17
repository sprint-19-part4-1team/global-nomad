'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { getActivityDetail } from '@/shared/apis/feature/activities';

/**
 * @description
 * - 체험 존재 여부를 확인하고, 존재하면 콜백을 실행하는 훅입니다.
 * - 체험이 삭제된 경우 토스트 메시지를 표시합니다.
 *
 * @param activityId - 확인할 체험 ID
 * @returns checkAndExecute 함수와 isLoading 상태
 */
export function useActivityExistenceCheck(activityId: number) {
  const [isLoading, setIsLoading] = useState(false);

  const checkAndExecute = async (onSuccess: () => void) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      await getActivityDetail(activityId);
      onSuccess();
    } catch (error) {
      if (error instanceof Error && 'status' in error && error.status === 404) {
        toast.error('존재하지 않는 체험입니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { checkAndExecute, isLoading };
}
