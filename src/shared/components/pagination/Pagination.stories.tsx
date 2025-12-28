import type { Meta, StoryObj } from '@storybook/nextjs';
import Pagination from './Pagination';

/**
 * URL 쿼리스트링(\`?page=\`)을 기준으로 동작하는 페이지네이션 컴포넌트입니다.
 *
 * (스토리북에서는 쿼리스트링을 이용한 시연은 불가하여 상황별 예시를 포함했습니다.)
 *
 * - 한 번에 최대 5개의 페이지 버튼을 표시합니다.
 * - 선택된 페이지는 비활성화되며 hover 되지 않습니다.
 * - 좌/우 화살표는 이동 가능할 때만 활성화됩니다.
 * - 페이지 이동 시 스크롤 위치를 유지합니다.
 */
const meta: Meta<typeof Pagination> = {
  title: 'Shared/Pagination',
  component: Pagination,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
        query: { page: '1' },
      },
    },
  },
  argTypes: {
    totalCount: {
      control: { type: 'number', min: 0 },
      description: '전체 아이템 개수',
    },
    size: { control: { type: 'number', min: 1 }, description: '한 페이지에 띄울 아이템 개수' },
  },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

const baseArgs = {
  totalCount: 80,
  size: 8,
};

export const FirstPage: Story = {
  args: baseArgs,
  parameters: {
    docs: {
      description: {
        story: '첫 페이지',
      },
      nextjs: {
        appDirectory: true,
        navigation: { pathname: '/', query: { page: '1' } },
      },
    },
  },
};

export const MiddlePage: Story = {
  args: baseArgs,
  parameters: {
    docs: {
      description: {
        story: '첫 페이지 이후의 페이지 + 중간 페이지 클릭 시',
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/', query: { page: '8' } },
    },
  },
};

export const LastPage: Story = {
  args: baseArgs,
  parameters: {
    docs: {
      description: {
        story: '맨 마지막 페이지에 도달한 경우',
      },
      nextjs: {
        appDirectory: true,
        navigation: { pathname: '/', query: { page: '10' } },
      },
    },
  },
};

export const FewPages: Story = {
  args: { totalCount: 20, size: 8 },
  parameters: {
    docs: {
      description: {
        story: '페이지가 1개 이상 5개 미만일 경우 ( ex) 3개 )',
      },
      nextjs: {
        appDirectory: true,
        navigation: { pathname: '/', query: { page: '1' } },
      },
    },
  },
};

export const OnePage: Story = {
  args: { totalCount: 5, size: 8 },
  parameters: {
    docs: {
      description: {
        story: '페이지가 1개일 경우',
      },
      nextjs: {
        appDirectory: true,
        navigation: { pathname: '/', query: { page: '1' } },
      },
    },
  },
};
