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
    variants: {
      control: { type: 'radio' },
      options: ['basic', 'shadow'],
      description: 'SelectDropdown 스타일 variants',
      table: {
        type: {
          summary: `'basic' | 'shadow'`,
        },
        defaultValue: {
          summary: 'basic',
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
  { value: '문화 · 예술', label: '🎨 문화 · 예술', disabled: false },
  { value: '식음료', label: '🍜 식음료', disabled: true },
  { value: '투어', label: '🏙️ 투어', disabled: false },
  { value: '관광', label: '🚍 관광', disabled: false },
  { value: '웰빙', label: '🌿 웰빙', disabled: false },
] as const;

type CategoryValue = (typeof CATEGORY_OPTIONS)[number]['value'];

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
    const [{ value }, updateArgs] = useArgs<{ value: CategoryValue | '' }>();

    return (
      <div className='flex h-320 w-360 flex-col gap-8'>
        <SelectDropdown<CategoryValue | ''>
          {...args}
          value={value}
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
              <SelectDropdownItem key={opt.value} value={opt.value} disabled={opt.disabled}>
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
    const [{ value }, updateArgs] = useArgs<{ value: CategoryValue | '' }>();
    const triggerRef = useRef<HTMLButtonElement>(null);

    return (
      <div className='flex h-360 w-360 flex-col gap-8'>
        <Label onClick={() => triggerRef.current?.focus()}>카테고리</Label>

        <SelectDropdown<CategoryValue | ''>
          {...args}
          value={value}
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
    const [{ value }, updateArgs] = useArgs<{ value: CategoryValue | '' }>();

    return (
      <div className='flex h-360 w-360 flex-col gap-8'>
        <SelectDropdown
          {...args}
          value={value}
          onChangeValue={(nextValue) => updateArgs({ value: nextValue })}>
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

export const WithShadowVariants: Story = {
  args: {
    variants: 'shadow',
    triggerId: 'category-filter',
    value: '',
  },
  parameters: {
    docs: {
      description: {
        story: `
\`variants="shadow"\` 스타일을 사용하는 SelectDropdown 예제입니다.

- 메인 페이지 필터 영역과 같은 **강조된 UI**에 사용됩니다.
- placeholder / value 스타일을 개별적으로 제어할 수 있습니다.
        `,
      },
    },
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs<{ value: string }>();

    return (
      <div className='h-200'>
        <SelectDropdown
          {...args}
          value={value}
          onChangeValue={(nextValue) => updateArgs({ value: nextValue })}>
          <SelectDropdownTrigger>
            <SelectDropdownValue
              placeholder='🛼 모든 체험'
              render={(value) => CATEGORY_OPTIONS.find((opt) => opt.value === value)?.label}
              placeholderClassName='heading-18 font-bold text-gray-950'
              valueClassName='heading-18 font-bold text-gray-950'
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
