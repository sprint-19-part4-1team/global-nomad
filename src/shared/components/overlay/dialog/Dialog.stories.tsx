import { Meta, StoryObj } from '@storybook/nextjs';
import { ComponentProps, useState } from 'react';
import Button from '@/shared/components/button/Button';
import Dialog from '@/shared/components/overlay/dialog/Dialog';
import useBodyScrollLock from '@/shared/components/overlay/hooks/useBodyScrollLock';

/**
 * Dialog 컴포넌트 스토리 가이드
 *
 * ### **주요 특징**
 * - 사용자에게 메시지를 전달하거나 확인/결정을 요구하기 위한 Dialog 컴포넌트입니다.
 * - `variant` 값에 따라 서로 다른 콘텐츠를 렌더링합니다.
 *   - `alert`: 단일 버튼을 가진 안내용 다이얼로그
 *   - `confirm`: 취소 / 확인 버튼을 가진 결정용 다이얼로그
 * - 내부적으로 `OverlayPortal`, `Backdrop`, `OverlaySurface`를 사용하여
 *   화면 최상단에 모달 형태로 표시됩니다.
 *
 * ### **사용 규칙**
 * - `variant`에 따라 사용할 수 있는 props가 **타입 레벨에서 엄격히 분리**되어 있습니다.
 * - `alert` variant에서는 `closeLabel`, `onClose`만 사용할 수 있습니다.
 * - `confirm` variant에서는 `cancelLabel`, `onCancel`, `confirmLabel`, `onConfirm`만 사용할 수 있습니다.
 * - 다른 variant 전용 props를 전달할 경우 TypeScript 컴파일 에러가 발생합니다.
 *
 * ### **Story 구성**
 * - 각 Story는 Dialog를 여는 버튼을 포함한 Wrapper 형태로 구성되어 있습니다.
 * - 실제 서비스에서 Dialog를 사용하는 방식과 동일한 흐름을 확인할 수 있습니다.
 */
const meta: Meta<typeof Dialog> = {
  title: 'Shared/Overlay/Dialog',
  component: Dialog,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['alert', 'confirm'],
      description: 'Dialog 스타일',
      table: {
        type: {
          summary: `'alert' | 'confirm'`,
        },
        defaultValue: { summary: 'alert' },
      },
    },
    message: {
      control: 'text',
      description: 'Dialog 메세지',
      table: {
        type: {
          summary: `ReactNode`,
        },
      },
    },
    closeLabel: {
      control: 'text',
      description: 'alert 내부의 버튼 라벨 (`alert` 전용)',
      table: {
        category: 'Alert',
        type: { summary: 'string' },
        defaultValue: { summary: '확인' },
      },
    },
    onClose: {
      action: 'clicked',
      description: 'alert 내부의 버튼 클릭 시 실행되는 콜백 (`alert` 전용)',
      table: {
        category: 'Alert',
        type: { summary: '() => void' },
      },
    },
    cancelLabel: {
      control: 'text',
      description: '취소 버튼에 표시될 라벨 (`confirm` 전용)',
      table: {
        category: 'Confirm',
        type: { summary: 'string' },
        defaultValue: { summary: '취소하기' },
      },
    },
    onCancel: {
      action: 'clicked',
      description: '취소 버튼 클릭 시 실행되는 콜백 (`confirm` 전용)',
      table: {
        category: 'Confirm',
        type: { summary: '() => void' },
      },
    },
    confirmLabel: {
      control: 'text',
      description: '확인 버튼에 표시될 라벨(`confirm` 전용)',
      table: {
        category: 'Confirm',
        type: { summary: 'string' },
      },
    },
    onConfirm: {
      action: 'clicked',
      description: '확인 버튼 클릭 시 실행되는 콜백 (`confirm` 전용)',
      table: {
        category: 'Confirm',
        type: { summary: '() => void' },
      },
    },
    isConfirm: {
      control: 'boolean',
      description: '확인 버튼에 로딩 상태를 표시하고 중복 클릭을 방지 (`confirm` 전용)',
      table: {
        category: 'Confirm',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

/** 스토리 렌더용 wrapper */
const DialogStoryWrapper = (props: ComponentProps<typeof Dialog>) => {
  const [open, setOpen] = useState(false);
  useBodyScrollLock(open);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Dialog 열기</Button>

      {open && props.variant === 'alert' && (
        <Dialog
          variant='alert'
          message={props.message}
          closeLabel={props.closeLabel}
          onClose={() => setOpen(false)}
        />
      )}

      {open && props.variant === 'confirm' && (
        <Dialog
          variant='confirm'
          message={props.message}
          cancelLabel={props.cancelLabel}
          confirmLabel={props.confirmLabel}
          onCancel={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          isConfirm={props.isConfirm}
        />
      )}
    </>
  );
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본으로 적용되는 Alert Dialog입니다.',
      },
    },
  },
  args: {
    variant: 'alert',
    message: 'dialog message',
    closeLabel: '확인',
  },
  render: (props) => <DialogStoryWrapper {...props} />,
};

export const Confirm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'variant confirm을 적용한 Dialog입니다.',
      },
    },
  },
  args: {
    variant: 'confirm',
    message: 'dialog message',
    cancelLabel: '취소하기',
    confirmLabel: '삭제하기',
  },
  render: (props) => <DialogStoryWrapper {...props} />,
};
