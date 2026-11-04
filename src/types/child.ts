import type { MoyaLook } from "./moya";

/** 아이 모드에서 쓰는 아이 정보 */
export interface ChildProfile {
  id: number;
  name: string;
  /** 아이가 고른 모야 변신 */
  look: MoyaLook;
  /** 모은 노래 쿠폰 수 (0~5) */
  coupons: number;
  /** 홈에서 모야가 건네는 말 */
  greeting: string;
}

/**
 * 모야가 무대에 서 있는 단계. 화면 구조가 같고 표정과 대사만 달라짐
 *   idle      기다리는 중. 말하기 버튼을 누르면 시작
 *   listening 아이 말을 듣는 중
 *   thinking  들은 말이 무슨 뜻인지 찾는 중
 */
export type MoyaStage = "idle" | "listening" | "thinking";

/**
 * 모야와 나누는 대화의 단계
 *   confirm   이 단어가 맞는지 되묻는 중
 *   sayAgain  못 알아들어서 다시 말해달라고 하는 중
 */
export type TalkStage =
  | MoyaStage
  | "confirm"
  | "sayAgain"
  | "place"
  | "candidates"
  | "meaning"
  | "repeat"
  | "repeatSuccess"
  | "repeatRetry"
  | "askLater"
  | "card";

/** 아이가 단어를 들은 곳 */
export interface HeardPlace {
  id: "tv" | "parents" | "book" | "kindergarten";
  label: string;
}

/** 후보 고르기에 올라가는 단어 */
export interface WordCandidate {
  word: string;
  /** 단어를 설명하는 짧은 힌트 */
  hint: string;
}

/** 되묻기 한 건. 후보가 하나면 single, 둘이면 two */
export type ConfirmQuiz =
  | {
      kind: "single";
      /** 모야 대사 */
      line: string;
      word: string;
      description: string;
    }
  | {
      kind: "two";
      line: string;
      candidates: { word: string; hint: string }[];
    };

/** 뜻을 알려주고 따라 말하기까지 이어지는 한 단어 분량의 수업 */
export interface WordLessonData {
  word: string;
  /** 글자 칸에 한 글자씩 올림 */
  letters: string[];
  /** 뜻 알려주기 대사 */
  meaningLine: string;
  /** 따라 말하기 성공 대사 */
  successLine: string;
  /** 따라 말하기가 잘 안 됐을 때 대사 */
  retryLine: string;
}

/** 다 모으면 노래가 생기는 쿠폰 장수 */
export const COUPON_GOAL = 5;

/** 카드 획득 화면에 올라가는 단어 */
export interface EarnedCard {
  word: string;
  /** 카드 아래 설명 */
  description: string;
}
