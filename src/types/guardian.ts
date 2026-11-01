export interface WeeklySummary {
  askedCount: number;
  reviewedCount: number;
  missingCount: number;
}

export interface FreeTrial {
  used: number;
  total: number;
}

export interface MissingWord {
  id: number;
  heardText: string;          // 모야가 들은 말 (예: 국정감자)
  askedAt: string;            // 물어본 시간 (ISO 문자열)
  audioUrl: string;           // 녹음 파일 주소
  correctedText: string | null; // 보호자가 알려준 단어, 아직 안 알려줬으면 null
}

export interface Child {
  id: number;
  name: string;
  weeklySummary: WeeklySummary;
  missingWords: MissingWord[];
  freeTrial: FreeTrial;
}