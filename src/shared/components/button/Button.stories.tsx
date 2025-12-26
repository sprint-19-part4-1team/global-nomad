import { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';
import Button from '@/shared/components/button/Button';

/**
 * Button 컴포넌트 스토리 가이드
 *
 * ### **주요 특징**
 * - action(button)과 navigation(link)을 제공하는 버튼 컴포넌트입니다.
 * - `href` 유무에 따라 렌더링 요소가 자동으로 분기됩니다.
 *   - `href` 없음 → `<button>` (action)
 *   - `href` 있음 → `<Link>` (navigation)
 * - 스타일은 `cva` 기반으로 관리되며 `variant`, `size`, `full` 조합을 지원합니다.
 *
 * ### **사용 규칙**
 * - action 버튼에서는 `href`를 사용할 수 없습니다.
 * - navigation 버튼에서는 `type`, `disabled`, `onClick`을 사용할 수 없습니다.
 * - 버튼의 의미(action / navigation)는 **타입 레벨에서 강제**됩니다.
 */
const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'negative'],
      description: 'Button 스타일',
      table: {
        type: {
          summary: `'primary' | 'secondary' | 'negative'`,
        },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Button 크기',
      table: {
        type: {
          summary: `'sm' | 'md' | 'lg'`,
        },
        defaultValue: { summary: 'lg' },
      },
    },
    full: {
      control: { type: 'boolean' },
      description: '버튼 풀 사이즈 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: '추가 스타일 클래스',
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      control: 'radio',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button 타입 (`action` 버튼 전용)',
      table: {
        category: 'Action',
        type: { summary: `'button' | 'submit' | 'reset'` },
        defaultValue: { summary: 'button' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'action 버튼 클릭 이벤트 (`action` 버튼 전용)',
      table: {
        category: 'Action',
        type: { summary: '() => void' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'disabled 여부 (`action` 버튼 전용)',
      table: {
        category: 'Action',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    href: {
      control: 'text',
      description: '이동할 경로 (`navigation` 버튼 전용)',
      table: {
        category: 'Navigation',
        type: { summary: 'string | UrlObject' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본으로 적용되는 버튼 스타일입니다.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'lg',
    full: false,
    children: 'label',
  },
  render: (args) => (
    <div className='flex w-[360px] justify-center'>
      <Button {...args}>label</Button>
    </div>
  ),
};

/** 스토리 렌더용 */
const SizePreview = ({ variant }: { variant: 'primary' | 'secondary' | 'negative' }) => (
  <div className='flex items-center gap-16'>
    <Button variant={variant} size='sm'>
      sm
    </Button>
    <Button variant={variant} size='md'>
      md
    </Button>
    <Button variant={variant} size='lg'>
      lg
    </Button>
  </div>
);

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: '`primary` 테마에서 `sm / md / lg` 사이즈를 한 번에 비교합니다.',
      },
    },
  },
  render: () => <SizePreview variant='primary' />,
};

export const Secondary: Story = {
  parameters: {
    docs: {
      description: {
        story: '`secondary` 테마에서 `sm / md / lg` 사이즈를 한 번에 비교합니다.',
      },
    },
  },
  render: () => <SizePreview variant='secondary' />,
};

export const Negative: Story = {
  parameters: {
    docs: {
      description: {
        story: '`negative` 테마에서 `sm / md / lg` 사이즈를 한 번에 비교합니다.',
      },
    },
  },
  render: () => <SizePreview variant='negative' />,
};

export const Navigation: Story = {
  parameters: {
    docs: {
      description: {
        story: '`href`가 전달되면 Button은 Next.js `Link` 기반 navigation 버튼으로 동작합니다.',
      },
    },
  },
  render: () => (
    <div className='flex gap-16'>
      <Button href='/'>메인으로</Button>
      <Button href='/mypage' variant='secondary'>
        마이페이지로 이동
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`disabled` 상태의 action 버튼입니다. 클릭 이벤트가 발생하지 않으며 비활성 스타일이 적용됩니다.',
      },
    },
  },
  args: {
    children: '비활성 버튼',
    disabled: true,
  },
};

export const Action: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'onClick은 action 버튼에서만 활용됩니다. 버튼 클릭 시 호출 여부를 테스트할 수 있습니다.',
      },
    },
  },
  args: {
    children: '클릭해보세요',
    onClick: fn(),
  },
};
