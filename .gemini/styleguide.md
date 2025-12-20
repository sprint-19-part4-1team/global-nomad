# 프로젝트 코딩 가이드라인 (Team Style Guide)

이 문서는 Gemini Code Assist가 리뷰 시 반드시 준수해야 할 우리 팀의 규칙입니다.

## 1. 네이밍 규칙 (Naming Convention)

이미지 가이드라인에 따라 아래 형식을 엄격히 준수합니다.

- **컴포넌트 (Components)**: `PascalCase` (예: `NoticeCard`, `ShopDetailPage`)
- **함수/변수 (Functions/Variables)**: `camelCase` (예: `handleSubmit`, `userData`)
- **상수 (Constants)**: `UPPER_SNAKE_CASE` (예: `API_BASE_URL`, `MAX_PAGE_SIZE`)
- **타입/인터페이스 (Types/Interfaces)**: `PascalCase` (예: `NoticeType`, `ShopFormData`)
- **폴더명 (Folders)**: `kebab-case` (예: `notice-list`, `shop-detail`)

## 2. 함수 정의 및 네이밍 전략

- **동사 접두사 사용**: 함수는 동작을 나타내야 하므로 '동사 + 목적어' 형태를 유지합니다.
  - 이벤트 리스너: `handle` 접두사 사용 (예: `handleClickToggle`)
  - 일반 함수: `get`, `set`, `fetch`, `update` 등을 사용
- **의미 없는 접두사 지양**: `My`, `The` 같은 주관적인 접두사는 사용하지 않고 역할 기반으로 네이밍합니다.
- **함수 정의 방식**:
  - **페이지/컴포넌트 단위**: 함수 선언식 사용 (`export default function Page() {}`)
  - **그 외 모든 함수**: 화살표 함수 사용 (`const change = () => {}`)

## 3. 주석 가이드

- **TSDoc**: 주요 함수나 인터페이스 상단에는 `/** ... */` 형태의 TSDoc을 작성합니다.
- **TODO**: 작업이 남은 부분은 `// TODO: 내용` 형식을 유지하여 하이라이터가 인식할 수 있게 합니다.

## 4. 커밋 메시지 규칙 (참고)

리뷰 시 PR 제목이나 설명이 아래 형식을 따르는지 확인합니다.

- `✨ Feat`: 새로운 기능/페이지 추가
- `🐛 Fix`: 버그 수정
- `♻️ Refactor`: 코드 리팩토링
- `⚙️ Chore`: 설정, 빌드, 패키지 설치, 이미지 추가
- `🎨 Style`: 스타일링, 포맷팅 변경
- `📝 Docs`: 문서 관련 수정
- `🚚 Rename`: 파일/디렉토리명 변경
- `🔥 Remove`: 코드/파일 삭제
