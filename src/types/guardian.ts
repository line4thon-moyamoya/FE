import type { AgeGroup } from "./signup";
import type { MoyaLook } from "./moya";

export interface WeeklySummary {
  askedCount: number;    // 물어본 단어
  reviewedCount: number; // 복습 끝냄
  missingCount: number;  // 못 찾은 말
}

export interface FreeTrial {
  used: number;
  total: number;
}

export interface MissingWord {
  id: number;
  heardText: string;            // 모야가 들은 말 (예: 국정감자)
  askedAt: string;              // 물어본 시간 (ISO 문자열)
  audioUrl: string;             // 녹음 파일 주소
  correctedText: string | null; // 보호자가 알려준 단어, 아직 안 알려줬으면 null
}

export type StarCount = 0 | 1 | 2 | 3;

export interface WordRecord {
  id: number;
  word: string;      // 실제 단어 (예: 영수증)
  spokenAs: string;  // 아이가 말한 표현 (예: 편니점)
  image?: string;    // 단어 아이콘 (없으면 첫 글자 표시)
  bgColor?: string;  // 아이콘 배경색 (없으면 기본 연보라)
  stars?: StarCount;  // 학습 정도 (0~3)
}

export interface WeeklyReport {
  weekLabel: string;        // 예: 10월 2주
  startDate: string;        // ISO 날짜 (예: 2026-10-06)
  endDate: string;          // ISO 날짜 (예: 2026-10-12)
  wordRecords: WordRecord[];
  conversationTip: string;  // 오늘 저녁 대화거리
}

export interface Child {
  id: number;
  name: string;
  ageGroup: AgeGroup; // 회원가입 시 고른 나이대
  moyaLook: MoyaLook | null; // 선택한 모야, 아직 없으면 null
  weeklySummary: WeeklySummary;
  missingWords: MissingWord[];
  freeTrial: FreeTrial;
  weeklyReport: WeeklyReport;
}