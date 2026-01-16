import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Icons from '@/assets/icons';
import useScheduleDateAccordionContext from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/hooks/useScheduleDateAccordion';
import { cn } from '@/shared/utils/cn';

interface ScheduleDateAccordionHeaderProps {
  /** 아코디언 헤더에 표시될 문자열 */
  date: Date;
  /** 아코디언 제거용 콜백 함수 */
  onDelete: () => void;
}

/**
 * ## ScheduleDateAccordionHeader
 *
 * @description
 * - 날짜 단위 스케줄 아코디언의 헤더 영역을 렌더링하는 컴포넌트입니다.
 * - 아코디언의 열림/닫힘 토글 버튼과 삭제 버튼을 제공합니다.
 *
 * @remarks
 * - 아코디언의 열림 상태(`isOpen`)는 Context를 통해 전달받아 사용합니다.
 * - 헤더 버튼은 `aria-expanded`, `aria-controls` 속성을 통해
 *   패널 영역과 접근성적으로 연결됩니다.
 *
 * @example
 * ```tsx
 * <ScheduleDateAccordionHeader
 *   date="2026-01-09"
 *   onDelete={() => removeScheduleDate(id)}
 * />
 * ```
 */
export default function ScheduleDateAccordionHeader({
  date,
  onDelete,
}: ScheduleDateAccordionHeaderProps) {
  const { isOpen, setIsOpen, triggerId, panelId } = useScheduleDateAccordionContext();
  const formatDate = format(date, 'yyyy년 MM월 dd일 EEEE', { locale: ko });

  return (
    <legend
      className={cn(
        'flex w-full items-center justify-between border border-gray-100 bg-white p-16',
        isOpen ? 'rounded-t-16 border-b-0' : 'rounded-16'
      )}>
      <button
        type='button'
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className='flex items-center gap-8'
        onClick={() => setIsOpen((prev) => !prev)}>
        <Icons.CaretRight
          aria-hidden='true'
          className={cn('h-24 w-24 transition duration-300', isOpen && 'rotate-90')}
        />
        <span className='body-14 font-bold text-gray-900 sm:body-16'>{formatDate}</span>
      </button>
      <button
        type='button'
        className='text-gray-300'
        aria-label={`${formatDate} 일정 삭제`}
        onClick={onDelete}>
        <Icons.Trash aria-hidden='true' className='h-24 w-24' />
      </button>
    </legend>
  );
}
