import api from "./api";

/** 노래 목록의 한 곡 */
export interface SongSummary {
  songId: number;
  title: string;
  /** 노래에 들어간 단어 5개 */
  words: string[];
}

/** 노래 안에서 단어 하나를 부르는 구간 */
export interface SongWord {
  wordId: number;
  word: string;
  imageUrl: string | null;
  /** 가사에 쓰는 짧은 설명 */
  songDescription: string;
  /** 이 단어를 부르기 시작하는 시점(초) */
  startSec: number;
}

export interface SongDetail {
  songId: number;
  title: string;
  status: "GENERATING" | "READY" | "FAILED";
  audioUrl: string | null;
  words: SongWord[];
}

/** 아이가 가진 노래 쿠폰 수 */
export const getSongCoupons = async (childId: number) => {
  const response = await api.get(`/api/v1/children/${childId}/song-coupons`);
  return (response.data.data as { couponCount: number }).couponCount;
};

/** 아이가 만든 노래 목록 */
export const getSongs = async (childId: number) => {
  const response = await api.get(`/api/v1/children/${childId}/songs`);
  return (response.data.data as { songs: SongSummary[] }).songs;
};

/** 노래 상세와 생성 상태 */
export const getSongDetail = async (childId: number, songId: number) => {
  const response = await api.get(
    `/api/v1/children/${childId}/songs/${songId}`,
  );
  return response.data.data as SongDetail;
};
