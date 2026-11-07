import api from "./api";

export interface WordDescription {
  wordId: number;
  word: string;
  description: string;
  descriptionAudioUrl: string | null;
}

/** 확정된 단어의 연령별 설명을 가져온다 */
export const getWordDescription = async (wordId: number, childId: number) => {
  const response = await api.get(`/api/v1/words/${wordId}`, {
    params: { childId },
  });
  return response.data.data as WordDescription;
};

export interface RepetitionDialogue {
  text: string;
  audioBase64: string | null;
  audioContentType: string | null;
}

export interface RepetitionResult {
  wordId: number;
  learnedWordId: number;
  /** 따라 말하기 성공 여부 */
  isCorrect: boolean;
  /** 이번에 카드를 새로 얻었는지 */
  isNewAcquisition: boolean;
  /** 이번 획득 직후 쿠폰 수 (0~5) */
  couponCount: number;
  repetitionDialogue: RepetitionDialogue;
  acquisitionDialogue: RepetitionDialogue;
  /** 다섯 장을 채우면 노래 생성이 시작되고 여기에 담겨 온다 */
  song: { songId: number; status: "GENERATING" | "READY" } | null;
}

/** 따라 말한 음성을 보내 결과와 카드 획득 여부를 받는다 */
export const sendRepetition = async (
  childId: number,
  wordId: number,
  audio: Blob,
) => {
  const form = new FormData();
  form.append("audio", audio, "repetition.webm");

  const response = await api.post(
    `/api/v1/children/${childId}/words/${wordId}/repetitions`,
    form,
  );
  return response.data.data as RepetitionResult;
};
