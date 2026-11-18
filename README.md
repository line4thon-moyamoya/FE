# 모야, 모야? 👽 — Frontend

> 아이가 궁금해한 말을 모야가 찾아주고, 모은 단어로 노래를 만들어요.

<br />

## 📖 About

**모야, 모야?** 서비스의 프론트엔드 레포지토리 입니다.
아이가 목소리로 질문하고, 단어 카드를 모으고, 노래를 듣는 **아이 모드**와 아이의 학습 기록을 확인하는 **보호자 모드**를 모바일 웹으로 구현 했습니다.

### 🔧 How we built

| 구현 | 설명 |
| --- | --- |
| **🎙️ 음성 녹음** | `MediaRecorder` 로 녹음하고, `AudioContext` 로 소리 크기를 살펴 말이 끝나고 1.5초 조용하면 스스로 멈춤 (최대 10초) |
| **🧩 레이아웃** | `RootLayout` 에서 최대 480px 앱 프레임을 잡고, `ChildLayout` 에서 헤더 · 탭바 · 쿠폰 시트를 한 번만 그려 아이 모드 화면들이 함께 사용 |
| **🗂️ 상태 공유** | 아이 정보와 쿠폰 수는 `ChildModeContext` 로 하위 화면에 내려줌 |
| **🔐 인증** | Axios 인터셉터에서 Access Token 과 보호자 모드 토큰(`X-Parent-Mode-Token`)을 요청마다 자동으로 붙임 |
| **🖼️ 단어 이미지** | 서버 이미지 → 내장 SVG 아이콘 → 기본 이미지 순으로 골라, 그림이 비거나 깨지지 않게 함 |
| **🎨 디자인 토큰** | Figma 변수(색 · 그림자 · 글꼴) 를 Tailwind v4 `@theme` 에 그대로 옮겨 클래스로 씀 |
| **📱 모바일 대응** | `safe-area-inset` 으로 노치 · 홈 인디케이터를 피하고, `prefers-reduced-motion` 기기에서는 애니메이션을 끔 |
| **🚀 배포** | Vercel 에 배포하고, `vercel.json` rewrite 로 `/api` 요청을 백엔드로 프록시 |

<br />

## 🛠 Tech Stack

| 분류 | 기술 |
| --- | --- |
| Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| Framework | ![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black) |
| Build Tool | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) |
| Styling | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) |
| Routing | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white) |
| HTTP Client | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) |
| Code Quality | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black) |
| Deploy | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |
| Design | ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white) |
| Collaboration | ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white) |

- **Web Audio API · MediaRecorder** 로 아이 목소리를 녹음하고, 말이 끝나면 스스로 녹음을 멈춥니다.

<br />

## 📁 Folder Structure

```
src
├── api          # Axios 인스턴스와 도메인별 API 함수
├── assets       # 이미지, 아이콘, 오디오
├── components   # 화면 단위로 나눈 컴포넌트
│   ├── Child      # 아이 모드
│   ├── Guardian   # 보호자 모드
│   ├── Signup     # 회원가입
│   ├── Error      # 연결 끊김 · 권한 없음 화면
│   └── common     # 버튼, 바텀시트, 헤더 등 공통 컴포넌트
├── constants    # 단어 아이콘, 모야 변신, 대화 단계 등 상수
├── contexts     # 아이 모드 Context
├── hooks        # 음성 녹음, 노래 재생 등 커스텀 훅
├── layout       # Root · 아이 모드 · 보호자 모드 레이아웃
├── mocks        # 개발용 목 데이터
├── pages        # 라우트 단위 페이지
├── types        # 공통 타입
└── utils        # 날짜 포맷, 조사 처리, 오디오 재생 등 유틸
```

<br />

## 🚀 Getting Started

```bash
# 1. 레포지토리 클론
git clone https://github.com/line4thon-moyamoya/FE.git
cd FE

# 2. 패키지 설치
npm install

# 3. 환경 변수 설정 (.env)
VITE_API_BASE_URL=백엔드_API_주소

# 4. 개발 서버 실행
npm run dev
```

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 타입 검사 후 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 검사 |

> 배포 환경에서는 `vercel.json` 의 rewrite 로 `/api` 요청을 백엔드 서버로 프록시해요.

<br />

## 🔀 Workflow

```
이슈 생성 -> 브랜치 생성 -> 작업 & 커밋 -> PR -> 리뷰 -> merge
```

1. 작업할 내용을 이슈로 생성해요
2. `develop` 에서 이슈 번호로 브랜치를 만들어요 → `feature/#12/home`
3. 작업 후 컨벤션에 맞게 커밋하고 push 해요
4. `develop` 으로 PR 을 올려요
5. 팀원 1명 이상 승인 후 merge 해요
6. merge 된 브랜치는 삭제해요

<br />

## 🌿 Branch Convention

```
main ← develop ← feature/#이슈번호/기능명
```

| 브랜치 | 설명 |
| --- | --- |
| `main` | 배포용 브랜치. 직접 push 금지 |
| `develop` | 개발 통합 브랜치. 기능이 완성되면 여기로 merge |
| `feature/#이슈번호/기능명` | 기능 개발 |
| `fix/#이슈번호/내용` | 버그 수정 |
| `api/#이슈번호/내용` | API 연동 |
| `hotfix/#이슈번호/내용` | 배포 후 긴급 수정 |
| `design/#이슈번호/내용` | UI, CSS 등 디자인 변경 |
| `refactor/#이슈번호/내용` | 코드 리팩토링 |
| `chore/#이슈번호/내용` | 패키지 설치, 설정 파일 등 기타 작업 |
| `docs/#이슈번호/내용` | 문서 수정 (README 등) |

- 브랜치 이름은 영어 소문자와 -(하이픈)으로 작성해요
- 예시: `feature/#12/voice-input`, `fix/#15/song-play-error`, `design/#7/onboarding-decoration`, `api/#74/signup`

<br />

## 💬 Commit Convention

```
이모지 태그: 작업 내용 요약
```

예시: `✨ Feat: 음성 질문 버튼 구현`

| 이모지 | 태그 | 설명 |
| :-: | --- | --- |
| ✨ | `Feat` | 새로운 기능 추가 |
| 🐛 | `Fix` | 버그 수정 |
| 💄 | `Design` | UI, CSS 등 디자인 변경 |
| 🎨 | `Style` | 코드 포맷팅, 세미콜론 등 (로직 변경 없음) |
| ♻️ | `Refactor` | 코드 리팩토링 |
| 📝 | `Docs` | 문서 수정 (README 등) |
| 🔧 | `Chore` | 패키지 설치, 설정 파일 등 기타 작업 |
| 🚚 | `Rename` | 파일·폴더명 변경 또는 이동 |
| 🔥 | `Remove` | 파일·코드 삭제 |
| ✅ | `Test` | 테스트 코드 추가·수정 |
| 🎉 | `Init` | 프로젝트 초기 세팅 |
| 🚀 | `Deploy` | 배포 및 main 브랜치 반영 |

- 커밋은 기능 단위로 작게 나눠서 해요
- 요약은 한글로, 마침표 없이 작성해요

<br />

## 👥 Team

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/dbszl3.png" width="160" alt="홍윤지" />
    </td>
    <td align="center">
      <img src="https://github.com/dnjsgkfka.png" width="160" alt="원하람" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>홍윤지</b></td>
    <td align="center"><b>원하람</b></td>
  </tr>
  <tr>
    <td align="center">Frontend</td>
    <td align="center">Frontend</td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/dbszl3">@dbszl3</a></td>
    <td align="center"><a href="https://github.com/dnjsgkfka">@dnjsgkfka</a></td>
  </tr>
</table>