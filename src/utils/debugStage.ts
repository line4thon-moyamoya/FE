import type { AnalyzeResult, Candidate, ConfirmResult } from "../api/question";
import type { RepetitionResult } from "../api/word";
import type { SongDetail } from "../api/song";
import type { TalkStage } from "../types/child";

const STAGES: TalkStage[] = [
  "idle",
  "listening",
  "thinking",
  "confirm",
  "sayAgain",
  "place",
  "candidates",
  "meaning",
  "repeat",
  "repeatSuccess",
  "repeatRetry",
  "askLater",
  "card",
];

/**
 * 테스트용: /home?stage=meaning 처럼 대화 단계를 바로 열어 본다.
 * 마이크 없이 다음 화면들을 확인하려고 둔 것이라 개발 모드에서만 동작한다.
 * 쓸 수 있는 값은 STAGES 에 있다.
 */
export const getDebugStage = (): TalkStage | null => {
  if (!import.meta.env.DEV) return null;
  const value = new URLSearchParams(window.location.search).get("stage");
  return STAGES.includes(value as TalkStage) ? (value as TalkStage) : null;
};

const candidate = (id: string, word: string, description: string): Candidate => ({
  candidateId: id,
  wordId: Number(id.slice(-1)) + 100,
  word,
  description,
  imageUrl: null,
  wordAudioUrl: null,
  wordAudioBase64: null,
  wordAudioContentType: null,
});

/**
 * 확인 질문 화면 네 가지를 골라 본다. /home?stage=confirm&case=homonym
 * single  2-4   후보 한 개
 * homonym 2-4a  같은 단어의 다른 뜻 두 개
 * words   2-4b  서로 다른 단어 두 개 (모르겠어 없음)
 * josa    2-4c  조사를 뗀 단어 한 개
 */
export type DebugConfirmCase = "single" | "homonym" | "words" | "josa";

const CONFIRM_CASES: Record<DebugConfirmCase, Pick<AnalyzeResult, "candidates" | "dialogue">> = {
  single: {
    candidates: [candidate("c_001", "적금", "돈을 꾸준히 모으는 것!")],
    dialogue: { text: "'적금'을 \n 말하는 거 같아!", audioUrl: null, audioBase64: null },
  },
  homonym: {
    candidates: [
      candidate("c_001", "연고", "다쳤을 때 바르는 약"),
      candidate("c_002", "연고", "서로 아는 사이"),
    ],
    dialogue: { text: "둘 중 더 가까운게 \n 뭐야?", audioUrl: null, audioBase64: null },
  },
  words: {
    candidates: [
      candidate("c_001", "환기", "창문 열어 바람 바꾸기"),
      candidate("c_002", "환불", "물건 주고 돈 돌려받기"),
    ],
    dialogue: { text: "환기? 환불? \n 어떤 거야?", audioUrl: null, audioBase64: null },
  },
  josa: {
    candidates: [candidate("c_001", "통장", "돈이 들어오고 나간 걸 적어 두는 거야.")],
    dialogue: { text: "혹시 통장? \n 돈을 맡겨 두는 책!", audioUrl: null, audioBase64: null },
  },
};

/** ?case= 로 고른 확인 질문 형태. 없으면 words */
export const getDebugConfirmCase = (): DebugConfirmCase => {
  const value = new URLSearchParams(window.location.search).get("case");
  return value && value in CONFIRM_CASES ? (value as DebugConfirmCase) : "words";
};

/** 단계를 그리는 데 필요한 최소한의 가짜 데이터 */
export const debugSession = (): AnalyzeResult => {
  const picked = CONFIRM_CASES[getDebugConfirmCase()];
  return {
    sessionId: "debug",
    status: "CANDIDATES_FOUND",
    candidateCount: picked.candidates.length,
    candidates: picked.candidates,
    dialogue: picked.dialogue,
    nextStep: null,
  };
};

export const DEBUG_WORD: ConfirmResult = {
  status: "CONFIRMED",
  wordId: 101,
  word: "적금",
  description: "은행에 매달 정해진 돈을 넣어서 크게 모으는 거야.",
  imageUrl: null,
  wordAudioUrl: null,
  nextStep: "WORD_LEARNING",
};

export const DEBUG_REPETITION: RepetitionResult = {
  wordId: 101,
  learnedWordId: 1,
  isCorrect: true,
  isNewAcquisition: true,
  couponCount: 5,
  repetitionDialogue: { text: "우와, 잘했어!", audioBase64: null, audioContentType: null },
  acquisitionDialogue: { text: "새 카드가 생겼어!", audioBase64: null, audioContentType: null },
  song: null,
};

export const DEBUG_SONG: SongDetail = {
  songId: 1,
  title: "적금 노래",
  status: "READY",
  audioUrl: null,
  words: [
    { wordId: 101, word: "적금", imageUrl: null, songDescription: "매달 모으는 돈", startSec: 0 },
    { wordId: 102, word: "예금", imageUrl: null, songDescription: "맡겨 두는 돈", startSec: 4 },
  ],
};
