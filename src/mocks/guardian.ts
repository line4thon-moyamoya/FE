import type { Child } from "../types/guardian";

export const MOCK_CHILD_LIST: Child[] = [
  {
    id: 1,
    name: "지우",
    weeklySummary: {
      askedCount: 12,
      reviewedCount: 7,
      missingCount: 1,
    },
    missingWords: [
      {
        id: 1,
        heardText: "국정감자",
        askedAt: "2026-10-08T19:12:00",
        audioUrl: "",
        correctedText: null,
      },
      {
        id: 2,
        heardText: "층간쏘음",
        askedAt: "2026-10-06T17:40:00",
        audioUrl: "",
        correctedText: "층간소음",
      },
    ],
    freeTrial: {
      used: 18,
      total: 20,
    },
  },
  {
    id: 2,
    name: "서아",
    weeklySummary: {
      askedCount: 5,
      reviewedCount: 3,
      missingCount: 2,
    },
    missingWords: [
      {
        id: 3,
        heardText: "탄소중닙",
        askedAt: "2026-10-09T16:20:00",
        audioUrl: "",
        correctedText: null,
      },
      {
        id: 4,
        heardText: "물가상성률",
        askedAt: "2026-10-07T20:05:00",
        audioUrl: "",
        correctedText: null,
      },
      {
        id: 5,
        heardText: "청문외",
        askedAt: "2026-10-05T18:30:00",
        audioUrl: "",
        correctedText: "청문회",
      },
    ],
    freeTrial: {
      used: 6,
      total: 20,
    },
  },
];