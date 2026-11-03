import type { Song } from "../types/song";

export const MOCK_SONGS: Record<number, Song[]> = {
  1: [
    {
      id: "song-1",
      title: "우리 노래 1",
      durationSec: 62,
      verses: [
        {
          wordId: "receipt",
          lyric: "영수증, 영수증, 그게 뭐야?",
          caption: "산 물건을 적어 주는 종이래요",
          startSec: 0,
        },
        {
          wordId: "fire-truck",
          lyric: "소방차, 소방차, 어디 가?",
          caption: "불을 끄러 달려가는 차래요",
          startSec: 12,
        },
        {
          wordId: "courage",
          lyric: "용기, 용기, 그게 뭐야?",
          caption: "씩씩하게 해 보는 마음이래요",
          startSec: 24,
        },
        {
          wordId: "savings",
          lyric: "적금, 적금, 그게 뭐야?",
          caption: "돈을 조금씩 모으는 거래요",
          startSec: 37,
        },
        {
          wordId: "bankbook",
          lyric: "통장, 통장, 그게 뭐야?",
          caption: "돈을 맡겨 두는 책이래요",
          startSec: 49,
        },
      ],
    },
  ],
  2: [],
};

export const getSongs = (childId: number): Song[] => MOCK_SONGS[childId] ?? [];

export const findSong = (childId: number, songId: string) =>
  getSongs(childId).find((s) => s.id === songId);
