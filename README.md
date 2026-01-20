## 🌏 Global Nomad | 글로벌 노마드

<img src="public/og-default.png" width="100%">

### 📌 프로젝트 소개

Global Nomad는 사용자와 호스트를 연결하여 다양한 액티비티를 탐색하고 예약할 수 있도록 돕는 체험 공유 커머스 플랫폼 아키텍처 프로젝트입니다.
단순히 기능을 구현하는 것을 넘어, 확장 가능한 프론트엔드 구조를 설계하고 복잡한 상태 변화를 안정적으로 관리하는 데 목적을 두었습니다.

모달, 캘린더, 드롭다운 등 공통 컴포넌트를 직접 설계하고 API 연동 최적화를 위한 커스텀 훅을 구현하며 프로젝트를 완성했습니다.

[글로벌 노마드 바로가기 ✈️](https://global-nomad-1team.vercel.app/)

---

### 🗓️ 프로젝트 일정

- `프로젝트 기간` : 2025.12.20 ~ 2026.01.19
- `프로젝트 주제 선정 및 진행 계획 수립` : 2025.12.19 ~ 2025.12.20
- `프로젝트 1차 배포` : 2026.01.05
- `프로젝트 2차 배포` : 2026.01.16
- `리팩토링` : 2026.01.12 ~
- `팀 소통 및 일정 관리` : Discord로 소통 **|** GitHub Issue로 진행 상황 파악

---

### 💁 팀원 및 R&R

<table>
  <tr>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/117738875?v=4" width="150" /></td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/42933755?v=4" width="150" /></td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/56210432?v=4" width="150" /></td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/56614719?v=4" width="150" /></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/aahreum">이아름</a></td>
    <td align="center"><a href="https://github.com/Jihyun0522">강지현</a></td>
    <td align="center"><a href="https://github.com/looks32">조대원</a></td>
    <td align="center"><a href="https://github.com/chldntjr1321">최우석</a></td>
  </tr>
  <tr bgcolor="#f9f9f9">
    <td align="center"><b>팀장</b> | <code>FE</code></td>
    <td align="center">팀원 | <code>FE</code></td>
    <td align="center">팀원 | <code>FE</code></td>
    <td align="center">팀원 | <code>FE</code></td>
  </tr>
  <tr>
    <td align="center" valign="top">
      인프라·초기 세팅<br>
      공통 컴포넌트<br>
      회원가입·로그인 페이지<br>
      체험 등록·수정 페이지<br>
      마이페이지 - 내 정보 수정
    </td>
    <td align="center" valign="top">
      Tailwind CSS 유틸리티 설정<br>
      입력 계열 공통 컴포넌트<br>
      회원가입·로그인 페이지 UI<br>
      체험 상세 페이지<br>
      마이페이지 - 예약 현황
    </td>
    <td align="center" valign="top">
      디자인 핵심 공통 컴포넌트<br>
      공통 레이아웃<br>
      메인 페이지<br>
      마이페이지 - 내 체험 관리
    </td>
    <td align="center" valign="top">
      공통 API 로직<br>
      공통 컴포넌트<br>
      카카오 회원가입·로그인<br>
      마이페이지 - 예약 내역<br>
      알림, 리뷰 등록
    </td>
  </tr>
</table>

---

### 🧑‍💻 기술 스택

#### 라이브러리

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![Tanstack Query](https://img.shields.io/badge/Tanstack%20Query-FF4154?style=for-the-badge&logo=Tanstack&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge) ![Reack Slick](https://img.shields.io/badge/React%20Slick-000000?style=for-the-badge) ![React Toastify](https://img.shields.io/badge/ReactvToastify-000000?style=for-the-badge) ![React-Day-Picker](https://img.shields.io/badge/REACT%20Day%20Picker-000000?style=for-the-badge)

- 프레임워크 : `Next.js 15.5.9 (App Router)`
- 라이브러리 : `React`
- 개발 언어 : `TypeScript`
- 스타일링 : `Tailwind CSS v4`
- 상태 관리
  - 서버 : `TanStack Query`
  - 클라이언트 : `Zustand`
- UI 컴포넌트 : `React-Slick`, `React-Toastify`, `React-Day-Picker`

#### 빌드 & 개발 도구

![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)

- 패키지 매니저 : `pnpm`
- 컴포넌트 개발 : `Storybook`
- 빌드 엔진 : `Next.js Turbopack`

#### 코드 품질 & 포맷팅

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black) ![Husky](https://img.shields.io/badge/Husky-000000?style=for-the-badge)

- 린트 : `ESLint`
- 포맷팅 : `Prettier`
- 자동화 도구 : `Husky`, `lint-staged`, `Commitlint`

#### 배포 & CI/CD

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

- 프로덕션 배포 : `Vercel`
- CI 워크플로우 : `GitHub Actions` (TypeScript 자동 검사 및 스토리북 빌드 자동화)
- UI 테스트 : `Chromatic` (스토리북 배포)

#### 협업 도구

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white) ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

- 코드 버전 & 이슈 관리 : `GitHub`
- 팀 소통 : `Discord`
- 문서화 : `Notion`
- 프로젝트 디자인 도안 : `Figma`

---

### 🧭 디렉토리 구조 설계 원칙
- 이 프로젝트는 기존의 역할 기반 폴더 구조에 기능 단위 개념을 도입한 feature 중심 구조를 사용합니다.
  - 하나의 기능(도메인)은 `feature` 폴더로 묶고, 해당 기능에서만 사용하는 `components / hooks / context / utils / constants` 등은 feature 내부에서 함께 관리합니다.
  - 이를 통해 기능 단위의 응집도를 높이고, 수정·확장 시 영향 범위를 명확하게 유지할 수 있도록 했습니다.
- 완전한 FSD 구조를 따르기 보다는 FSD의 장점만 일부 선택적으로 적용했습니다.


### 📦 디렉토리 구조

```
📦src
 ┣ 📂app                  # Next.js App Router 기반 페이지 및 API 라우트
 ┃ ┣ 📂(protected)        # 인증이 필요한 서비스 페이지 (마이페이지, 액티비티 관리 등)
 ┃ ┣ 📂(public)           # 비인증 접근 가능 페이지 (메인, 상세, 로그인/회원가입)
 ┃ ┗ 📂api                # BFF(Backend For Frontend) 패턴을 적용한 API 엔드포인트
 ┣ 📂features             # 도메인별 핵심 비즈니스 로직 및 컴포넌트
 ┃ ┣ 📂auth               # 인증/인가 관련 로직
 ┃ ┣ 📂main               # 메인 페이지 전용 기능
 ┃ ┣ 📂activity-*         # 액티비티 조회/등록/수정 상세 기능
 ┃ ┣ 📂mypage             # 마이페이지 하위 도메인별 관리
 ┃ ┗ 📂notification       # 알림 시스템
 ┣ 📂shared               # 프로젝트 전역에서 재사용되는 공통 자산
 ┃ ┣ 📂apis               # API 통신 계층 (base, bff, feature 서비스)
 ┃ ┣ 📂components         # 공통 UI 컴포넌트 (Design System)
 ┃ ┣ 📂hooks              # 범용 커스텀 훅
 ┃ ┣ 📂stores             # 전역 상태 관리 (Zustand)
 ┃ ┗ 📂types              # 전역 타입 정의
 ┃ ┗ 📂styles             # Tailwind 테마, 공통 스타일
 ┣ 📂stories              # UI 컴포넌트 문서화 및 테스트 (Storybook)
 ┗ 📜middleware.ts        # 라우팅 가드 및 인증 처리
```

---

### ✨ 주요 기능 소개

#### 🖥️ 메인 서비스

<table>
  <tr>
    <td align="center" bgcolor="#f9f9f9"><b>메인 페이지</b></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/bc49d06f-862f-452b-98e0-8d6593544094" width='500px' /></td>
    <td align="left">
      - 인기 체험 목록<br>
      - 카테고리별 필터링<br>
      - 키워드 검색
    </td>
  </tr>
  <tr>
    <td align="center" bgcolor="#f9f9f9"><b>검색 결과 페이지</b></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/bb122116-4e59-4119-a1de-574f22c89e47" width='500px' /></td>
    <td align="left">
      - 검색 결과 목록<br>
      - 카테고리 필터<br>
      - 가격순/최신순 정렬
    </td>
  </tr>
  <tr>
    <td align="center" bgcolor="#f9f9f9"><b>체험 상세</b></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/967ae858-d088-4c9c-85dc-2c87d0f85db2" width='500px' /></td>
    <td align="left">
      - 체험 정보 및 위치 확인<br>
      - 체험 가능 날짜/시간 선택<br>
      - 예약 신청<br>
      - 별점/후기 목록 표시
    </td>
  </tr>
  <tr>
    <td align="center" bgcolor="#f9f9f9"><b>알림</b></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/2b504757-ce0c-4dc8-9240-305141f24f44" width='150px' /></td>
    <td align="left">
      - 예약 승인/거절 알림<br>
      - 실시간 알림 확인
    </td>
  </tr>
  </table>

#### 🖥️ 마이페이지

<table>
  <tr>
    <td align="center" bgcolor="#f9f9f9"><b>내 정보</b></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/1e94d5e3-105a-4f17-ab8c-1f416ec0f0a3" width='500px' /></td>
    <td align="left">
      - 프로필 이미지 변경<br>
      - 닉네임/비밀번호 수정
    </td>
  </tr>
  <tr>
    <td align="center" bgcolor="#f9f9f9"><b>예약 내역</b></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/17e0a5af-b105-4ece-a41e-42eeb979039f" width='500px' /></td>
    <td align="left">
      - 예약 상태별 필터링<br>
      - 예약 취소<br>
      - 리뷰 작성
    </td>
  </tr>
  <tr>
    <td align="center" bgcolor="#f9f9f9"><b>내 체험 관리</b></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/b20bf93a-3dea-4898-89eb-fbadde8388a9" width='500px' />
</td>
    <td align="left">
      - 체험 등록/수정/삭제<br>
      - 등록한 체험 목록 확인
    </td>
  </tr>
  <tr>
    <td align="center" bgcolor="#f9f9f9"><b>예약 현황</b></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/c694cfcb-55b2-49b1-af32-638f7d96c240" width='500px' /></td>
    <td align="left">
      - 체험별/날짜별 예약 조회<br>
      - 예약 승인/거절
    </td>
  </tr>
  </table>

#### 🖥️ 반응형 ex) 마이 페이지

<table>
  <tr>
    <td align="center" bgcolor="#f9f9f9"><b>PC</b></td>
    <td align="center" bgcolor="#f9f9f9"><b>Tablet</b></td>
    <td align="center" bgcolor="#f9f9f9"><b>Mobile</b></td>
  </tr>
  <tr>
    <td align="center"><img src="https://github.com/user-attachments/assets/7e06008a-9416-481b-a45b-346cdc41164c" height='400px'></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/73380aec-992a-4711-a36e-6edb328be916" height='400px'></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/f8a0fefe-a4e7-49f6-88eb-c96be5043c95" height='400px'></td>
  </tr>
</table>

---

### 🔗 링크

[🚀 배포 URL](https://global-nomad-1team.vercel.app/) <br>
[👀 발표 자료](https://github.com/user-attachments/files/24707076/19._1._._.pdf) <br>
[🎥 시연 영상](https://youtu.be/FvOUM6Ip5S0) <br>
[📜 Notion 문서](https://www.notion.so/ahahahahreum/2c35213dcd4c80a99a16de00a56a8b70?source=copy_link)
