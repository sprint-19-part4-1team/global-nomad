import Icons from '@/assets/icons';

interface ScheduleDateAddButtonProps {
  /** 버튼 비활성화 여부 */
  disabled: boolean;
  /** 버튼 클릭 시 실행되는 핸들러 */
  onAdd: () => void;
}

/**
 * ## ScheduleDateAddButton
 *
 * @description
 * 날짜 선택 후 새로운 일정(아코디언)을 추가하기 위한 버튼 컴포넌트입니다.
 */
export default function ScheduleDateAddButton({ disabled, onAdd }: ScheduleDateAddButtonProps) {
  return (
    <button
      type='button'
      disabled={disabled}
      className='flex h-42 min-w-42 items-center justify-center rounded-full bg-primary-500 text-white disabled:bg-gray-100 disabled:text-gray-25'
      onClick={onAdd}>
      <Icons.Plus aria-hidden='true' className='h-24 w-24' />
    </button>
  );
}
