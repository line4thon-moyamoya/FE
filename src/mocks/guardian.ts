import type { Child } from "../types/guardian";
import receipt from "../assets/icons/words/receipt.svg";
import savings from "../assets/icons/words/savings.svg";
import brave from "../assets/icons/words/brave.svg";
import recycling from "../assets/icons/words/separate-recycling.svg";
import finedust from "../assets/icons/words/fine-dust.svg";

export const MOCK_CHILD_LIST: Child[] = [
  {
    id: 1,
    name: "지우",
    ageGroup: "3-4",
    moyaLook: "default",
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
    weeklyReport: {
      weekLabel: "10월 2주",
      startDate: "2026-10-06",
      endDate: "2026-10-12",
      wordRecords: [
        {
          id: 1,
          word: "영수증",
          spokenAs: "편니점",
          image: receipt,
          bgColor: "#E3F5D6",
          stars: 2,
        },
        {
          id: 2,
          word: "적금",
          spokenAs: "저궁통",
          image: savings,
          bgColor: "#FFE4EC",
          stars: 0,
        },
        {
          id: 3,
          word: "용기",
          spokenAs: "무지게",
          image: brave,
          bgColor: "#FFF2C7",
          stars: 3,
        },
      ],
      conversationTip: "“영수증에는 뭐가 적혀 있을까?” 하고 물어봐 주세요.",
    },
  },
  {
    id: 2,
    name: "서아",
    ageGroup: "5",
    moyaLook: "car",
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
    weeklyReport: {
      weekLabel: "10월 2주",
      startDate: "2026-10-06",
      endDate: "2026-10-12",
      wordRecords: [
        {
          id: 4,
          word: "분리수거",
          spokenAs: "분리수고",
          image: recycling,
          bgColor: "#E3F5D6",
          stars: 1,
        },
        {
          id: 5,
          word: "미세먼지",
          spokenAs: "미세먼디",
          image: finedust,
          bgColor: "#FFF2C7",
          stars: 3,
        },
      ],
      conversationTip: "“분리수거는 왜 해야 할까?” 하고 물어봐 주세요.",
    },
  },
];

// API 연동 시 아이 정보 수정 요청으로 교체
export const updateMockChild = (id: number, patch: Partial<Child>) => {
  const child = MOCK_CHILD_LIST.find((c) => c.id === id);
  if (child) Object.assign(child, patch);
};