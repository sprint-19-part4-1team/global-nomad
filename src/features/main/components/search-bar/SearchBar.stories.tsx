import type { Meta, StoryObj } from '@storybook/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchBar from './SearchBar';

/**
 * 기본 SearchBar
 *
 * @description
 * - 검색어 입력 필드와 검색 버튼을 포함한 기본 상태
 * - Enter 키 또는 버튼 클릭 시 submit 동작 확인 가능
 * - 입력값이 비어 있거나 공백만 있는 경우 경고 alert 노출
 * - 정상 입력 시 입력된 검색어 alert 노출
 *
 * @example
 * ```tsx
 * <SearchBar />
 * ```
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

const meta: Meta<typeof SearchBar> = {
  title: 'Features/Main/SearchBar',
  component: SearchBar,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/search',
        query: {},
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {};

export const WithKeyword: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/search',
        query: {
          keyword: '서핑',
        },
      },
    },
  },
};
