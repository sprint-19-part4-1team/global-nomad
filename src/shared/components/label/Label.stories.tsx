import type { Meta, StoryObj } from '@storybook/nextjs';
import Label from '@/shared/components/label/Label';

/**
 * Label 컴포넌트 스토리 가이드
 *
 * ### **주요 특징**
 * - 폼 요소와 함께 사용되는 텍스트 라벨 컴포넌트입니다.
 * - `variant` 프리셋을 통해 의미 기반 타이포그래피 스타일을 제공합니다.
 * - 스토리 화면에 보이는 회색 테두리는 정렬 확인용 테두리입니다. 실제로 적용되지 않습니다.
 *
 * ### **variant presets**
 * - `authForm`
 *   - 로그인 / 회원가입 등 유저 관련 폼에서 사용되는 기본 라벨
 *
 * - `form`
 *   - 일반 폼 입력 영역에서 강조가 필요한 라벨
 *
 * - `review`
 *   - 리뷰, 요약, 결과 화면 등에서 사용되는 라벨
 *
 * ### **사용 규칙**
 * - 개별적인 `size`, `align`, `weight` props는 제공하지 않습니다.
 * - 스타일은 `variant` 프리셋을 통해서만 제어합니다.
 */
const meta: Meta<typeof Label> = {
  title: 'Shared/Label',
  component: Label,
  argTypes: {
    htmlFor: {
      control: 'text',
      description: '연결될 form control의 id 값',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'radio',
      options: ['authForm', 'form', 'review'],
      description: '라벨 스타일 프리셋',
      table: {
        type: {
          summary: `'authForm' | 'form' | 'review'`,
        },
        defaultValue: { summary: 'authForm' },
      },
    },
    children: {
      control: 'text',
      description: '라벨에 표시될 텍스트',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: '추가적인 스타일 대응',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '로그인 / 회원가입 등 유저 관련 폼에서 사용되는 기본 Label입니다.',
      },
    },
  },
  args: {
    htmlFor: 'email',
    variant: 'authForm',
    children: '이메일',
  },
  render: (args) => (
    <div className='flex w-320 flex-col gap-8 border border-gray-50 px-16 py-4'>
      <Label {...args} />
    </div>
  ),
};

export const Form: Story = {
  parameters: {
    docs: {
      description: {
        story: '체험 등록 폼에서 사용되는 Label입니다.',
      },
    },
  },
  args: {
    htmlFor: 'title',
    variant: 'form',
    children: '체험 제목',
  },
  render: (args) => (
    <div className='flex w-320 flex-col gap-8 border border-gray-50 px-16 py-4'>
      <Label {...args} />
    </div>
  ),
};

export const Review: Story = {
  parameters: {
    docs: {
      description: {
        story: '리뷰 폼에서 사용되는 Label입니다.',
      },
    },
  },
  args: {
    htmlFor: 'review',
    variant: 'review',
    children: '소중한 경험을 들려주세요',
  },
  render: (args) => (
    <div className='flex w-320 flex-col gap-8 border border-gray-50 px-16 py-4'>
      <Label {...args} />
    </div>
  ),
};
