import type { ConfirmQuiz, HeardPlace, WordCandidate } from "../types/child";

/**
 * 되묻기 목데이터.
 * 음성 인식이 붙기 전까지 순서대로 돌려 쓰며 세 경우를 모두 확인할 수 있게 둠.
 */
export const MOCK_CONFIRM_QUIZZES: ConfirmQuiz[] = [
  // 후보가 하나일 때
  {
    kind: "single",
    line: "적금 말하는 거야?",
    word: "적금",
    description: "돈을 꾸준히 모으는 것!",
  },
  // 두 단어가 모두 맞을 때
  {
    kind: "two",
    line: "환기? 환불?\n어떤 거야?",
    candidates: [
      { word: "환기", hint: "창문 열어 바람 바꾸기" },
      { word: "환불", hint: "물건 주고 돈 돌려받기" },
    ],
  },
  // 조사를 떼고 되물을 때
  {
    kind: "single",
    line: "혹시 통장?\n돈을 맡겨 두는 책!",
    word: "통장",
    description: "돈을 맡겨 둔 걸 적는 책!",
  },
];

/** 어디서 들었어? 선택지 */
export const MOCK_HEARD_PLACES: HeardPlace[] = [
  { id: "tv", label: "TV·유튜브" },
  { id: "parents", label: "엄마 아빠" },
  { id: "book", label: "책" },
  { id: "kindergarten", label: "유치원" },
];

/** 들은 곳을 고른 뒤 보여줄 단어 후보 */
export const MOCK_WORD_CANDIDATES: WordCandidate[] = [
  { word: "적금", hint: "돈을 꾸준히 모으는 것" },
  { word: "적응", hint: "새로운 곳에 익숙해지는 것" },
  { word: "세금", hint: "나라에 내는 돈" },
];
