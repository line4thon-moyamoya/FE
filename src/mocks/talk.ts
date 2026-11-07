import type {
  ConfirmQuiz,
  EarnedCard,
  HeardPlace,
  WordCandidate,
  WordLessonData,
} from "../types/child";

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

/** 뜻 알려주기 ~ 따라 말하기에 쓰는 단어 */
export const MOCK_WORD_LESSON: WordLessonData = {
  word: "적금",
  letters: ["적", "금"],
  meaningLine: "적금은 돈을 꾸준히 모으는 거야.\n조금씩 차곡차곡 모아!",
  successLine: "우와! 적금!\n잘했어!",
  retryLine: "적금! 적금!\n다음에 또 해보자!",
};

/** 따라 말하기를 마치면 받는 카드 */
export const MOCK_EARNED_CARD: EarnedCard = {
  word: "적금",
  description: "돈을 조금씩 꾸준히 모으는 거야. 큰돈이 돼!",
};

/** 쿠폰을 다 모았을 때 노래에 들어가는 단어 */
export const MOCK_SONG_WORDS = ["영수증", "소방차", "용기", "적금", "통장"];

/**
 * 음성 인식 결과를 흉내 냄.
 * 네 번에 한 번은 빈 글자를 돌려줘서 "아무 말도 안 들린" 경우를 확인할 수 있게 함.
 */
export function mockRecognize(attempt: number): string {
  return attempt % 4 === 3 ? "" : "적금";
}
