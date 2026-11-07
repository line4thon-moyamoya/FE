import api from "./api";

/** 카드 배경색. id 로 사용 */
const CARD_COLORS = ["#FFE4EC", "#EEEAFF", "#E3F5D6", "#E3EEFF", "#FFF2C7"];

export const cardColor = (wordId: number) =>
  CARD_COLORS[wordId % CARD_COLORS.length];

export interface LearnedWord {
  learnedWordId: number;
  wordId: number;
  word: string;
  imageUrl: string | null;
  /** 칭찬 스티커를 받았는지 */
  stickerEarned: boolean;
  /** 아직 열어 보지 않은 카드 */
  isNew: boolean;
}

export interface Wordbook {
  totalCount: number;
  learnedWords: LearnedWord[];
}

/** 아이가 모은 카드 목록. 최신 획득순 */
export const getWordbook = async (childId: number) => {
  const response = await api.get(`/api/v1/children/${childId}/learned-words`);
  return response.data.data as Wordbook;
};

export interface LearnedWordDetail {
  learnedWordId: number;
  wordId: number;
  word: string;
  description: string;
  imageUrl: string | null;
  descriptionAudioUrl: string | null;
}

/** 카드 상세. 카드 획득 화면과 공용 */
export const getLearnedWord = async (
  childId: number,
  learnedWordId: number,
) => {
  const response = await api.get(
    `/api/v1/children/${childId}/learned-words/${learnedWordId}`,
  );
  return response.data.data as LearnedWordDetail;
};

/** NEW 배지 해제 */
export const markLearnedWordViewed = async (
  childId: number,
  learnedWordId: number,
) => {
  await api.patch(
    `/api/v1/children/${childId}/learned-words/${learnedWordId}/viewed`,
  );
};
