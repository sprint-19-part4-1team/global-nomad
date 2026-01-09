'use client';

import { format } from 'date-fns';
import { useRef, useState } from 'react';
import Icons from '@/assets/icons';
import ScheduleDateAddButton from '@/features/activity-form/common/components/schedule-date-section/schedule-date-input/ScheduleDateAddButton';
import ScheduleDatePicker from '@/features/activity-form/common/components/schedule-date-section/schedule-date-input/ScheduleDatePicker';
import Label from '@/shared/components/label/Label';
import useEscape from '@/shared/hooks/useEscape';
import useOutsideClick from '@/shared/hooks/useOutsideClick';

interface ScheduleDateInputProps {
  /** 현재 선택한 날짜 */
  date?: Date;
  /** 날짜 선택/초기화를 위한 setter 함수 */
  setDate: (date: Date | undefined) => void;
  /** 버튼 클릭 시 호출되는 콜백 */
  onAddDate: (date: Date) => void;
}

/**
 * ## ScheduleDateField
 *
 * @description
 * - 날짜 선택을 위한 입력 필드 컴포넌트입니다.
 * - DatePicker를 통해 날짜를 선택하고,
 *   ➕ 버튼을 눌러 선택된 날짜를 상위 컴포넌트로 확정(add)합니다.
 * - 확정된 날짜는 상위 컴포넌트에서 아코디언 등으로 관리됩니다.
 */
export default function ScheduleDateField({ date, setDate, onAddDate }: ScheduleDateInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleToggle = () => setIsOpen((prev) => !prev);

  useEscape(handleClose, isOpen);
  useOutsideClick(containerRef, handleClose, isOpen);

  const handleAddDate = () => {
    if (!date) {
      return;
    }
    setIsOpen(false);
    onAddDate(date);
    setDate(undefined);
  };

  return (
    <div className='input-container'>
      <div className='flex items-center gap-8'>
        <Label htmlFor='date' variant='form'>
          날짜
        </Label>

        <span className='inline-block rounded-8 bg-gray-25 px-4 py-2 text-center body-12 font-medium text-gray-600 select-none sm:body-14'>
          선택 가능한 날짜는 내일부터 최대 60일 이후까지입니다.
        </span>
      </div>
      <div className='relative' ref={containerRef}>
        <div className='flex items-center gap-16'>
          <div className='input-box border-field-default' onClick={handleToggle}>
            <input
              readOnly
              value={date ? format(date, 'yyyy. MM. dd.') : ''}
              placeholder='날짜를 선택해 주세요.'
              className='input-base cursor-pointer'
            />
            <Icons.Calendar
              aria-hidden='true'
              className='input-icon cursor-pointer text-gray-300'
            />
          </div>
          <ScheduleDateAddButton disabled={!date} onAdd={handleAddDate} />
        </div>
        <ScheduleDatePicker value={date} onChange={setDate} isOpen={isOpen} />
      </div>
    </div>
  );
}
