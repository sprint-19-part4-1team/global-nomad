import { toast } from 'react-toastify';

/**
 * 텍스트를 클립보드에 복사
 *
 * @param text - 복사할 텍스트
 * @param successMessage - 복사 성공 시 표시할 토스트 메시지
 * @returns 복사 성공 여부
 *
 * @example
 * ```tsx
 * // 주소 복사
 * await copyToClipboard(address, '주소가 복사되었습니다');
 *
 * // URL 복사
 * await copyToClipboard(window.location.href, 'URL이 복사되었습니다');
 * ```
 */
export const copyToClipboard = async (
  text: string,
  successMessage: string = '복사되었습니다'
): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMessage);
    return true;
  } catch (error) {
    console.error('복사 실패:', error);
    toast.error('복사에 실패했습니다');
    return false;
  }
};
