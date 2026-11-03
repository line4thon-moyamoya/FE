// 모야 캐릭터의 변신과 표정
// Figma 컴포넌트 "모야" 의 베리언트와 1:1 대응

export const MOYA_LOOKS = ["default", "car", "princess"] as const;
export type MoyaLook = (typeof MOYA_LOOKS)[number];

export const MOYA_MOODS = [
  "greeting", // 인사
  "explain", // 설명
  "curious", // 궁금
  "confused", // 당황
  "excited", // 신남
] as const;
export type MoyaMood = (typeof MOYA_MOODS)[number];

export const MOYA_LOOK_LABEL: Record<MoyaLook, string> = {
  default: "기본 모야",
  car: "자동차 모야",
  princess: "공주 모야",
};
