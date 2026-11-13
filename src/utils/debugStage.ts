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
  descriptionAudioUrl: null,
  descriptionAudioBase64: null,
  descriptionAudioContentType: null,
});

/** 단계를 그리는 데 필요한 최소한의 가짜 데이터 */
export const DEBUG_SESSION: AnalyzeResult = {
  sessionId: "debug",
  status: "CANDIDATES_FOUND",
  candidateCount: 2,
  candidates: [
    candidate("c_001", "적금", "은행에 매달 정해진 돈을 넣어서 크게 모으는 거야."),
    candidate("c_002", "예금", "돈을 은행에 맡겨 두었다가 나중에 찾는 거야."),
  ],
  dialogue: { text: "적금? 예금? 어떤 거야?", audioUrl: null, audioBase64: null },
  nextStep: null,
};

export const DEBUG_WORD: ConfirmResult = {
  status: "CONFIRMED",
  wordId: 101,
  word: "적금",
  description: "은행에 매달 정해진 돈을 넣어서 크게 모으는 거야.",
  imageUrl: null,
  wordAudioUrl: null,
  descriptionAudioUrl: null,
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
