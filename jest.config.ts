import type { Config } from 'jest';
import nextJest from 'next/jest.js';

/**
 * Next.js 환경에 맞는 Jest 설정을 생성하는 헬퍼
 */
const createJestConfig = nextJest({
  // next.config.js 및 .env 파일을 테스트 환경에 로드하기 위해 Next.js 앱 경로를 제공합니다.
  dir: './',
});

/**
 * Jest 사용자 설정
 */
const config: Config = {
  /**
   * 각 테스트가 끝날 때마다 mock 함수의 호출 기록을 자동으로 초기화
   * → 테스트 간 상태 오염 방지
   */
  clearMocks: true,

  /**
   * Jest가 모듈을 해석할 때 사용할 경로 별칭 매핑
   * Next.js / tsconfig의 "@/" 경로를 Jest에서도 인식하게 함
   */
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  /**
   * 테스트 환경
   * - jsdom: 브라우저 환경 흉내 (window, document 사용 가능)
   * - React 컴포넌트 테스트에 필수
   */
  testEnvironment: 'jsdom',

  /**
   * Jest가 테스트 파일을 찾는 패턴
   * - *.test.ts / *.test.tsx
   * - *.spec.ts / *.spec.tsx
   * - __tests__ 폴더 안의 파일들
   */
  testMatch: ['**/__tests__/**/*.?([mc])[jt]s?(x)', '**/?(*.)+(spec|test).?([mc])[jt]s?(x)'],
};

export default createJestConfig(config);
