import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/nextjs',
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    // 기존 webpack 설정에서 SVG를 처리하는 규칙 찾기
    const imageRule = config.module?.rules?.find((rule) => {
      const test = (rule as { test: RegExp }).test;

      if (!test) {
        return false;
      }

      return test.test('.svg');
    }) as { [key: string]: any };

    // 기존 규칙이 있으면 SVG 파일을 제외 (SVGR로 처리하기 위함)
    if (imageRule) {
      imageRule.exclude = /\.svg$/;
    }

    // SVG 파일을 React 컴포넌트로 변환하는 SVGR 규칙 추가
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
export default config;
