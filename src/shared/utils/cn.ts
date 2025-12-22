import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS 클래스명을 조건부 병합하고 충돌을 해결
 *
 * @param inputs - 병합할 클래스명들 (문자열, 객체, 배열 등)
 * @return 병합되고 최적화 된 클래스명 문자열
 *
 * @example
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4' (px-4가 px-2를 덮어씀)
 * cn('text-red-500', { 'text-blue-500': isActive }) // 조건부 적용
 * cn(['bg-white', isDark && 'bg-black']) // 배열 및 조건부
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
