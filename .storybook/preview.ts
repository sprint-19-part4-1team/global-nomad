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

    // 기본 레이아웃 가운데 정렬
    layout: 'centered',

    // docs 자동 생성
    tags: ['autudocs'],
  },
};

export default preview;
