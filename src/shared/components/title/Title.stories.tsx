import type { Meta, StoryObj } from '@storybook/nextjs';
import Title from './Title';

/**
 * Title 컴포넌트 스토리 가이드
 *
 * - Tailwind v4의 `@utility foo-*`는 `*` 자리에 들어갈 값들을 오름차순으로 정렬합니다.
 * - 따라서 `font-size: 18px → 20px → 24px → 32px` 순서로 CSS가 생성됩니다.
 * - Storybook에서 `className`으로 `heading-*`을 덮어쓰려 해도,
 *   `size`가 32라면 CSS 선언 순서상 적용되지 않습니다.
 *
 * 확인 방법
 * - `size`를 18로 설정
 * - `className`에 더 큰 `heading-*` 클래스 입력
 *
 * 참고
 * - `font-bold`, `font-semibold` 등은 서로 다른 속성이므로 정상 적용됩니다.
 */

const meta: Meta<typeof Title> = {
  title: 'Shared/Title',
  component: Title,
  tags: ['autodocs'],
  render: (args) => <Title {...args} />,
  argTypes: {
    as: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'div'] },
    size: { control: 'select', options: [32, 24, 20, 18] },
    weight: { control: 'select', options: ['bold', 'semibold', 'medium', 'normal'] },
  },
};

export default meta;
type Story = StoryObj<typeof Title>;

export const Default: Story = {
  args: {
    as: 'h1',
    size: 32,
    weight: 'bold',
    children: '🔥 인기 체험',
  },
};
