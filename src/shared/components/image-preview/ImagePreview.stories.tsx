import { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import ImagePreview from './ImagePreview';

/**
 * ImagePreview 컴포넌트 스토리 가이드
 *
 * ### 주요 특징
 * - 서버 이미지(`src`) 또는 로컬 파일(`file`)을 미리보기로 보여주는 컴포넌트입니다.
 * - `file`이 전달되면 `URL.createObjectURL`을 사용하여 **미리보기**를 제공합니다.
 * - `file`이 변경되거나 컴포넌트가 언마운트될 때
 *   `URL.revokeObjectURL`을 호출하여 **메모리 누수 방지**를 합니다.
 *
 * ### 렌더링 우선순위
 * - `file`이 존재하는 경우 → `file` 미리보기
 * - `file`이 없고 `src`가 존재하는 경우 → 서버 이미지
 * - 둘 다 없는 경우 → `fallback`
 *
 * ### 사용 예제
 * ```tsx
 *<ImagePreview
 *  className='rounded-full'
 *  file={profileImg}
 *  src='/og-default.png'
 *  fallback={
 *   <Avatar user={user} size='lg'>
 *     <AvatarFallback />
 *     <AvatarImage />
 *   </Avatar>
 *  }
 * />
 * ```
 */
const meta: Meta<typeof ImagePreview> = {
  title: 'Shared/ImagePreview',
  component: ImagePreview,
  args: {
    alt: '미리보기 이미지',
    className: 'rounded-12',
  },
  argTypes: {
    file: {
      description: '사용자가 등록한 이미지 파일',
      table: {
        type: {
          summary: 'File | null',
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='h-120 w-120'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ImagePreview>;

export const Default: Story = {
  args: {
    fallback: (
      <div className='flex h-full w-full items-center justify-center rounded-12 bg-gray-100 text-gray-400'>
        이미지 없음
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'src, file이 없어지면 Fallback이 보여집니다.',
      },
    },
  },
};

export const WithServerImage: Story = {
  args: {
    src: 'https://picsum.photos/300/300',
  },
  parameters: {
    docs: {
      description: {
        story: '서버에서 받아온 이미지가 있다면 fallback보다 우선해서 보여집니다.',
      },
    },
  },
};

export const WithRemoveButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '프리뷰 이미지를 삭제하는 버튼을 보여줍니다. 삭제하면 fallback이나 src가 보여집니다.',
      },
    },
  },

  render: () => {
    const [visible, setVisible] = useState(true);

    return (
      <div className='h-120 w-120'>
        {visible ? (
          <ImagePreview
            className='rounded-12'
            src='https://picsum.photos/300/300'
            onRemove={() => setVisible(false)}
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center rounded-12 bg-gray-100 text-gray-400'>
            이미지 삭제됨
          </div>
        )}
      </div>
    );
  },
};
