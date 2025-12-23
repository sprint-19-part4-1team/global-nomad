import type { Preview } from '@storybook/nextjs';
import '../src/shared/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    // 기본 레이아웃 가운데 정렬
    layout: 'centered',

    // docs 자동 생성
    tags: ['autudocs'],
  },
};

export default preview;
