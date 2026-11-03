import type { CollectedCard } from "../types/word";

export const CARDS_PER_SONG = 3;
export const CARDS_PER_COUPON = 3;
export const COUPONS_PER_SONG = 5;

export const MOCK_NOTEBOOK: Record<number, CollectedCard[]> = {
  1: [
    {
      wordId: "savings",
      collectedAt: "2026-10-12T18:20:00",
      isNew: true,
      reviewed: true,
    },
    {
      wordId: "bankbook",
      collectedAt: "2026-10-11T19:05:00",
      isNew: true,
      reviewed: true,
    },
    {
      wordId: "receipt",
      collectedAt: "2026-10-10T17:40:00",
      isNew: false,
      reviewed: true,
    },
    {
      wordId: "fire-truck",
      collectedAt: "2026-10-09T16:10:00",
      isNew: false,
      reviewed: false,
    },
    {
      wordId: "courage",
      collectedAt: "2026-10-08T20:00:00",
      isNew: false,
      reviewed: true,
    },
    {
      wordId: "reuse",
      collectedAt: "2026-10-07T18:30:00",
      isNew: false,
      reviewed: false,
    },
  ],
  2: [
    {
      wordId: "reuse",
      collectedAt: "2026-10-09T16:20:00",
      isNew: true,
      reviewed: false,
    },
    {
      wordId: "courage",
      collectedAt: "2026-10-06T18:00:00",
      isNew: false,
      reviewed: true,
    },
  ],
};

export const getCollectedCards = (childId: number | null): CollectedCard[] =>
  childId === null ? [] : (MOCK_NOTEBOOK[childId] ?? []);

export const markCardAsSeen = (childId: number | null, wordId: string) => {
  const card = getCollectedCards(childId).find((c) => c.wordId === wordId);
  if (card) card.isNew = false;
};

export const getRemainingForNextSong = (collectedCount: number) =>
  CARDS_PER_SONG - (collectedCount % CARDS_PER_SONG);

export const getRemainingForNextCoupon = (collectedCount: number) =>
  CARDS_PER_COUPON - (collectedCount % CARDS_PER_COUPON);
