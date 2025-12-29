import type { Meta, StoryObj } from '@storybook/nextjs';
import { useRef } from 'react';
import { useArgs } from 'storybook/internal/preview-api';
import {
  SelectDropdown,
  SelectDropdownTrigger,
  SelectDropdownValue,
  SelectDropdownContent,
  SelectDropdownItem,
} from '@/shared/components/dropdown/select';
import Label from '@/shared/components/label/Label';

/**
 * SelectDropdown 컴포넌트 스토리 가이드
 *
 * ### 주요 특징
 * - SelectDropdown은 선택 값을 외부에서 제어하는 컴포넌트입니다.
 * - Trigger / Value / Content / Item으로 구성된 **컴파운드 패턴**을 사용합니다.
 * - Trigger는 button 기반으로 구현되어 키보드 접근성을 기본 제공합니다.
 *
 * ### **접근성 규칙**
 * - Trigger는 `button` 요소이며 `aria-haspopup="listbox"`를 가집니다.
 * - 드롭다운의 열림 상태는 `aria-expanded`로 표현됩니다.
 * - 옵션 리스트는 `role="listbox"`, 각 옵션은 `role="option"`을 사용합니다.
 * - 선택된 옵션은 `aria-selected`로 전달됩니다.
 * - Label 클릭 시 Trigger로 포커스를 이동시키는 UX를 제공합니다.
 *
 * ### 사용 예시
 * ```tsx
 * <Label onClick={() => triggerRef.current?.focus()}>
 *   카테고리
 * </Label>
 *
 * <SelectDropdown value={value} onChangeValue={setValue}>
 *   <SelectDropdownTrigger ref={triggerRef}>
 *     <SelectDropdownValue placeholder="카테고리 선택" />
 *   </SelectDropdownTrigger>
 *
 *   <SelectDropdownContent>
 *     <SelectDropdownItem value="식음료">🍜 식음료</SelectDropdownItem>
 *   </SelectDropdownContent>
 * </SelectDropdown>
 * ```
 */
const meta: Meta<typeof SelectDropdown> = {
  title: 'Shared/Dropdown/SelectDropdown',
  component: SelectDropdown,
  argTypes: {
    value: {
      control: 'text',
      description: '현재 선택된 값',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    onChangeValue: {
      description: '선택 값이 변경될 때 호출되는 콜백 함수',
      table: {
        type: {
          summary: '(value: string) => void',
        },
      },
    },
    triggerId: {
      description: 'Trigger 버튼에 사용할 id (접근성 연결용)',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    children: {
      description:
        '`SelectDropdownTrigger`, `SelectDropdownContent`, `SelectDropdownItem`을 조합하여 전달',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectDropdown>;

const CATEGORY_OPTIONS = [
  { value: '문화 · 예술', label: '🎨 문화 · 예술' },
  { value: '식음료', label: '🍜 식음료' },
  { value: '투어', label: '🏙️ 투어' },
  { value: '관광', label: '🚍 관광' },
  { value: '웰빙', label: '🌿 웰빙' },
] as const;

export const Default: Story = {
  args: {
    value: '',
    triggerId: 'category-filter',
  },
  parameters: {
    docs: {
      description: {
        story: '기본적인 SelectDropdown 예제입니다.',
      },
    },
  },
  render: (args) => {
    const [, updateArgs] = useArgs<{ value: string }>();

    return (
      <div className='flex h-320 w-360 flex-col gap-8'>
        <SelectDropdown
          {...args}
          onChangeValue={(nextValue) => {
            updateArgs({ value: nextValue });
          }}>
          <SelectDropdownTrigger>
            <SelectDropdownValue
              placeholder='카테고리 선택'
              render={(value) => CATEGORY_OPTIONS.find((opt) => opt.value === value)?.label}
            />
          </SelectDropdownTrigger>

          <SelectDropdownContent>
            {CATEGORY_OPTIONS.map((opt) => (
              <SelectDropdownItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectDropdownItem>
            ))}
          </SelectDropdownContent>
        </SelectDropdown>
      </div>
    );
  },
};

export const WithLabel: Story = {
  args: {
    value: '',
    triggerId: 'category-filter',
  },
  parameters: {
    docs: {
      description: {
        story: `
Label과 함께 사용하는 SelectDropdown 예시입니다.

- 커스텀 SelectDropdown은 native \`<select>\`가 아니기 때문에
  \`label + htmlFor\`로는 포커스를 위임할 수 없습니다.
- 따라서 Label의 \`onClick\`에서
  \`SelectDropdownTrigger\`에 전달한 ref를 사용해
  **직접 focus를 이동**시켜야 합니다.

\`\`\`tsx
<Label onClick={() => triggerRef.current?.focus()}>
  카테고리
</Label>
\`\`\`
`,
      },
    },
  },
  render: (args) => {
    const [, updateArgs] = useArgs<{ value: string }>();
    const triggerRef = useRef<HTMLButtonElement>(null);

    return (
      <div className='flex h-360 w-360 flex-col gap-8'>
        <Label onClick={() => triggerRef.current?.focus()}>카테고리</Label>

        <SelectDropdown
          {...args}
          onChangeValue={(nextValue) => {
            updateArgs({ value: nextValue });
          }}>
          <SelectDropdownTrigger ref={triggerRef}>
            <SelectDropdownValue
              placeholder='카테고리 선택'
              render={(value) => CATEGORY_OPTIONS.find((opt) => opt.value === value)?.label}
            />
          </SelectDropdownTrigger>

          <SelectDropdownContent>
            {CATEGORY_OPTIONS.map((opt) => (
              <SelectDropdownItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectDropdownItem>
            ))}
          </SelectDropdownContent>
        </SelectDropdown>
      </div>
    );
  },
};

const LONG_OPTIONS = Array.from({ length: 20 }).map((_, index) => ({
  value: `option-${index + 1}`,
  label: `옵션 ${index + 1}`,
}));

export const WithScroll: Story = {
  args: {
    triggerId: 'category-filter',
  },
  parameters: {
    docs: {
      description: {
        story: `
옵션 개수가 많은 경우의 SelectDropdown 예제입니다.

- 옵션 리스트의 높이가 제한(332px)되어 있으며,
- 최대 높이를 초과하면 자동으로 스크롤이 생성됩니다.
        `,
      },
    },
  },
  render: (args) => {
    const [, updateArgs] = useArgs<{ value: string }>();

    return (
      <div className='flex h-360 w-360 flex-col gap-8'>
        <SelectDropdown {...args} onChangeValue={(nextValue) => updateArgs({ value: nextValue })}>
          <SelectDropdownTrigger>
            <SelectDropdownValue
              placeholder='옵션 선택'
              render={(value) => LONG_OPTIONS.find((opt) => opt.value === value)?.label}
            />
          </SelectDropdownTrigger>

          <SelectDropdownContent>
            {LONG_OPTIONS.map((opt) => (
              <SelectDropdownItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectDropdownItem>
            ))}
          </SelectDropdownContent>
        </SelectDropdown>
      </div>
    );
  },
};
