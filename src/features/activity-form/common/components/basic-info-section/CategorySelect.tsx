import {
  SelectDropdown,
  SelectDropdownTrigger,
  SelectDropdownValue,
  SelectDropdownContent,
  SelectDropdownItem,
} from '@/shared/components/dropdown/select';
import Label from '@/shared/components/label/Label';
import { ACTIVITY_CATEGORIES, ActivityCategory } from '@/shared/constants';

interface CategorySelectProps {
  /** 선택된 카테고리 값 */
  value: ActivityCategory | '';
  /** 카테고리 변경 시 호출되는 콜백 함수 */
  onChange: (value: ActivityCategory) => void;
}

/**
 * ## CategorySelect
 *
 * @description
 * 체험(Activity) 카테고리를 선택하기 위한 Select Dropdown 기반 컴포넌트입니다.
 */
export default function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div className='flex flex-col gap-8'>
      <Label variant='form'>카테고리</Label>
      <SelectDropdown
        triggerId='category-filter'
        value={value}
        onChangeValue={(value) => onChange(value as ActivityCategory)}>
        <SelectDropdownTrigger>
          <SelectDropdownValue
            placeholder='카테고리 선택'
            render={(value) => ACTIVITY_CATEGORIES.find((c) => c.value === value)?.label}
          />
        </SelectDropdownTrigger>
        <SelectDropdownContent>
          {ACTIVITY_CATEGORIES.map((c) => (
            <SelectDropdownItem key={c.value} value={c.value}>
              {c.label}
            </SelectDropdownItem>
          ))}
        </SelectDropdownContent>
      </SelectDropdown>
    </div>
  );
}
