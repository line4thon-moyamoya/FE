import type { MoyaLook } from "../types/moya";

interface MoyaLookInfo {
  /** 아이에게 읽어 주는 이름 */
  label: string;
  /** 홈 미리보기에서 건네는 첫 인사 */
  greeting: string;
}

export const MOYA_LOOK_INFO: Record<MoyaLook, MoyaLookInfo> = {
  default: {
    label: "기본 모야",
    greeting: "안녕! 나는 모야야.\n궁금한 말 물어봐!",
  },
  car: {
    label: "자동차 모야",
    greeting: "부릉부릉!\n자동차 모야 출발!",
  },
  princess: {
    label: "공주 모야",
    greeting: "짠! 공주 모야 왔어.\n궁금한 말 물어봐!",
  },
};
