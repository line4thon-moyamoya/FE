# 모야, 모야? 👽

<br />

## Workflow

```
이슈 생성 -> 브랜치 생성 -> 작업 & 커밋 -> PR -> 리뷰 -> merge
```

1. 작업할 내용을 이슈로 생성해요
2. `develop` 에서 이슈 번호로 브랜치를 만들어요 -> `feature/#12/home
3. 작업 후 컨벤션에 맞게 커밋하고 push 해요
4. `develop` 으로 PR 을 올려요
5. 팀원 1명 이상 승인 후 merge 해요
6. merge 된 브랜치는 삭제해요

## Branch Convention

```
main ← develop ← feature/#이슈번호/기능명
```
| 브랜치 | 설명 |
|---|---|
| `main` | 배포용 브랜치. 직접 push 금지 |
| `develop` | 개발 통합 브랜치. 기능이 완성되면 여기로 merge |
| `feature/#이슈번호/기능명` | 기능 개발 |
| `fix/#이슈번호/내용` | 버그 수정 |
| `hotfix/#이슈번호/내용` | 배포 후 긴급 수정 |
| `design/#이슈번호/내용` | UI, CSS 등 디자인 변경 |
| `refactor/#이슈번호/내용` | 코드 리팩토링 |
| `chore/#이슈번호/내용` | 패키지 설치, 설정 파일 등 기타 작업 |
| `docs/#이슈번호/내용` | 문서 수정 (README 등) |

- 브랜치 이름은 영어 소문자와 -(하이픈)으로 작성해요
- 예시: `feature/#12/voice-input`, `fix/#15/song-play-error`, `design/#7/onboarding-decoration`

## Commit Convention

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

- 커밋은 기능 단위로 작게 나눠서 해요
- 요약은 한글로, 마침표 없이 작성해요
