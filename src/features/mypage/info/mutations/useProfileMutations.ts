import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProfileImageUrl, updateMyInfo } from '@/shared/apis/feature/users';
import { QUERY_KEYS } from '@/shared/constants';
import { useUserStore } from '@/shared/stores/userStore';

/**
 * ## useCreateProfileImageUrlMutation
 *
 * @description
 * - 프로필 이미지 업로드를 위한 presigned URL 생성 API를 호출하는 mutation 훅입니다.
 * - 사용자가 선택한 이미지 파일을 서버로 전송하여, 업로드 가능한 프로필 이미지 URL을 발급받습니다.
 *
 * @returns 프로필 이미지 URL 생성을 위한 React Query mutation 객체
 */
export const useCreateProfileImageUrlMutation = () =>
  useMutation({
    mutationFn: createProfileImageUrl,
  });

/**
 * ## useUpdateMyInfoMutation
 *
 * @description
 * - 로그인한 사용자의 내 정보(닉네임, 프로필 이미지 등)를 수정하는 mutation 훅입니다.
 * - API 호출이 성공하면 React Query 캐시와 전역 사용자 상태(zustand)를 동기화합니다.
 *
 * @returns 내 정보 수정을 위한 React Query mutation 객체
 */
export const useUpdateMyInfoMutation = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((s) => s.setUser);

  return useMutation({
    mutationFn: updateMyInfo,
    onSuccess: (updateUser) => {
      queryClient.setQueryData(QUERY_KEYS.MY_INFO, updateUser);
      setUser(updateUser);
    },
  });
};
