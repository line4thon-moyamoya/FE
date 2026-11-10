import api from "./api";

/** 서버가 주는 음성. URL 이거나 Base64 둘 중 하나만 채워진다 */
export interface Voice {
  audioUrl?: string | null;
  audioBase64?: string | null;
  audioContentType?: string | null;
}

/** 모야가 말할 대사 */
export interface Dialogue extends Voice {
  text: string;
}

export interface Candidate {
  candidateId: string;
  /** 기존 단어면 숫자, 새로 찾은 단어면 null */
  wordId: number | null;
  word: string;
  description: string;
  imageUrl: string | null;
  wordAudioUrl: string | null;
  wordAudioBase64: string | null;
  wordAudioContentType: string | null;
  descriptionAudioUrl: string | null;
  descriptionAudioBase64: string | null;
  descriptionAudioContentType: string | null;
}

export interface AnalyzeResult {
  sessionId: string;
  status: "CANDIDATES_FOUND" | "NO_CANDIDATE";
  candidateCount: number;
  candidates: Candidate[];
  dialogue: Dialogue | null;
  nextStep?: string | null;
}

/** 아이가 단어를 들은 곳 */
export type HeardContext =
  | "TV_YOUTUBE"
  | "PARENTS"
  | "BOOK"
  | "KINDERGARTEN"
  | "UNKNOWN";

export interface ConfirmResult {
  status: "CONFIRMED";
  wordId: number;
  word: string;
  description: string;
  imageUrl: string | null;
  wordAudioUrl: string | null;
  descriptionAudioUrl: string | null;
  nextStep: string;
}

/** 녹음한 음성을 보내 1차 후보를 찾는다 */
export const analyzeQuestion = async (childId: number, audio: Blob) => {
  const form = new FormData();
  // 파일 이름이 없으면 일부 서버가 파트를 인식하지 못함
  form.append("audio", audio, "question.webm");
  form.append("childId", String(childId));

  const response = await api.post("/api/v1/questions/analyze", form);
  return response.data.data as AnalyzeResult;
};

/** 들은 곳을 알려 주고 2차 후보를 찾는다 */
export const clarifyQuestion = async (
  sessionId: string,
  context: HeardContext,
) => {
  const response = await api.post(`/api/v1/questions/${sessionId}/clarify`, {
    context,
  });
  return response.data.data as AnalyzeResult;
};

/** 아이가 고른 후보를 확정한다 */
export const confirmWord = async (sessionId: string, candidateId: string) => {
  const response = await api.post(`/api/v1/questions/${sessionId}/confirm`, {
    candidateId,
  });
  return response.data.data as ConfirmResult;
};

/** 끝내 찾지 못해 보호자에게 물어볼 단어로 남긴다 */
export const saveWordRequest = async (sessionId: string) => {
  const response = await api.post(
    `/api/v1/questions/${sessionId}/word-request`,
  );
  return response.data.data as { wordRequestId: number; status: string };
};
