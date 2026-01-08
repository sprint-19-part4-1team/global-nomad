import { ChangeEvent, useRef } from 'react';

/**
 * ## useFileInput
 *
 * @description
 * - `<input type="file">` 요소를 제어하기 위한 공통 훅입니다.
 * - 파일 선택 UI를 직접 노출하지 않고, 외부 트리거(버튼, 슬롯 등)를 통해
 *   파일 선택 다이얼로그를 열 수 있도록 돕습니다.
 * - 사용자가 파일을 선택하면 첫 번째 파일(`File`)을 추출하여
 *   `onSelect` 콜백으로 전달합니다.
 *
 * @param onSelect - 파일 선택이 완료되었을 때 호출되는 콜백 함수
 *   - 선택된 첫 번째 `File` 객체를 인자로 전달합니다.
 *
 * @returns 파일 입력을 제어하기 위한 객체
 * - `fileInputRef` : 숨겨진 `<input type="file">`에 연결할 ref
 * - `open` : 파일 선택 다이얼로그를 여는 함수
 * - `handleChange` : `<input type="file">`의 `onChange` 이벤트 핸들러
 *
 * @example
 * ```tsx
 * const { fileInputRef, open, handleChange } = useFileInput((file) => {
 *   console.log(file);
 * });
 *
 * <input
 *   ref={fileInputRef}
 *   type="file"
 *   accept="image/*"
 *   className="sr-only"
 *   onChange={handleChange}
 * />
 *
 * <button type="button" onClick={open}>
 *   이미지 선택
 * </button>
 * ```
 */
export const useFileInput = (onSelect: (file: File) => void) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const open = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    onSelect(file);
    e.target.value = '';
  };

  return { fileInputRef, open, handleChange };
};
