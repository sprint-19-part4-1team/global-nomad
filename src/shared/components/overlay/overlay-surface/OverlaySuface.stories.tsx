import { Meta, StoryObj } from '@storybook/nextjs';
import { ReactNode } from 'react';
import Backdrop from '@/shared/components/overlay/backdrop/Backdrop';
import OverlaySurface from '@/shared/components/overlay/overlay-surface/OverlaySurface';

/**
 * OverlaySurface 컴포넌트 스토리 가이드
 *
 * ### **주요 특징**
 * - OverlaySurface는 overlay 계열 컴포넌트의 **시각적 표면(Surface)** 역할만 담당합니다.
 * - 실제 사용 시에는 Backdrop를 조합해서 `Dialog` / `BottomSheet` / `Panel`을 구성합니다.
 *
 * ### **사용 규칙**
 * - 위치(position)와 형태(variant)는 조합 규칙에 따라 사용해야 합니다.
 *   - `dialog` + `center`
 *   - `sheet` + `bottom`
 *   - `panel` + `right`
 * - 열기/닫기, 포커스 트랩, 스크롤 락 등의 행동 로직은 상위 컴포넌트에서 제어합니다.
 */

const meta: Meta<typeof OverlaySurface> = {
  title: 'Shared/Overlay/Primitives/OverlaySurface',
  component: OverlaySurface,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['dialog', 'sheet', 'panel'],
      description: 'Surface의 기본 형태(크기/레이아웃)',
      table: {
        type: {
          summary: `'dialog' | 'sheet' | 'panel'`,
        },
        defaultValue: { summary: 'dialog' },
      },
    },
    position: {
      control: 'radio',
      options: ['center', 'right', 'bottom'],
      description: 'Surface가 화면에 배치되는 위치',
      table: {
        type: {
          summary: `'center' | 'right' | 'bottom'`,
        },
        defaultValue: { summary: 'center' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OverlaySurface>;

export const Default: Story = {
  args: {
    position: 'center',
    variant: 'dialog',
    children: <div className='p-30'>콘텐츠</div>,
  },
  decorators: [
    (Story) => (
      <div className='relative h-400 w-[100%] bg-op-50'>
        <Story />
      </div>
    ),
  ],
};

/** 스토리 렌더용 프리뷰 컴포넌트 */
const OverlayPreview = ({ children }: { children: ReactNode }) => (
  <div className='relative h-500 w-full overflow-hidden bg-white'>
    <Backdrop />
    {children}
  </div>
);

export const WithBackdrop: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'OverlaySurface는 일반적으로 Backdrop과 함께 사용됩니다. 아래 예시는 가장 기본적인 조합입니다.',
      },
    },
  },

  render: () => (
    <OverlayPreview>
      <OverlaySurface>
        <div className='p-30'>OverlaySurface with Backdrop</div>
      </OverlaySurface>
    </OverlayPreview>
  ),
};

export const DialogExample: Story = {
  parameters: {
    docs: {
      description: {
        story: '중앙에 표시되는 기본 Dialog 형태입니다.',
      },
    },
  },
  render: () => (
    <OverlayPreview>
      <OverlaySurface position='center' variant='dialog'>
        <div className='p-30'>Dialog Content</div>
      </OverlaySurface>
    </OverlayPreview>
  ),
};

export const PanelExample: Story = {
  parameters: {
    docs: {
      description: {
        story: '우측에 표시되는 표시되는 기본 panel 형태입니다.',
      },
    },
  },
  render: () => (
    <OverlayPreview>
      <OverlaySurface position='right' variant='panel'>
        <div className='p-30'>panel Content</div>
      </OverlaySurface>
    </OverlayPreview>
  ),
};

export const BottomSheetExample: Story = {
  parameters: {
    docs: {
      description: {
        story: '화면 하단에 표시되는 BottomSheet 형태입니다.',
      },
    },
  },
  render: () => (
    <OverlayPreview>
      <OverlaySurface position='bottom' variant='sheet' className='h-400'>
        <div className='p-30'>Bottom Sheet Content</div>
      </OverlaySurface>
    </OverlayPreview>
  ),
};
