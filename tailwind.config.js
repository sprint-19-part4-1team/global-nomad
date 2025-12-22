const pxToRem = require('tailwindcss-preset-px-to-rem');

module.exports = {
  presets: [pxToRem()], // px to rem 프리셋 추가
  content: ['./src/**/*.{ts,tsx}'], // 경로 설정
  theme: {
    extend: {},
  },
};
