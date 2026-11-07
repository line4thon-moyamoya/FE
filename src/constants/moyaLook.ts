import type { MoyaLook, MoyaMood } from "../types/moya";

interface MoyaLookInfo {
  /** 아이에게 읽어 주는 이름 */
  label: string;
  /** 카드 아래처럼 좁은 자리에 쓰는 짧은 이름 */
  shortLabel: string;
  /** 홈 미리보기에서 건네는 첫 인사 */
  greeting: string;
  /** 홈 미리보기에서 짓는 표정. 변신마다 다름 */
  mood: MoyaMood;
}

/**
 * 변신별 이름과 첫인사. 변신에 딸린 글은 모두 여기에 둔다.
 * 첫인사와 표정은 선택 직후에만 쓰고, 아이 모드 홈은 변신과 상관없이
 * 설명 표정에 같은 인사말을 쓴다.
 */
export const MOYA_LOOK_INFO: Record<MoyaLook, MoyaLookInfo> = {
  default: {
    label: "기본 모야",
    shortLabel: "기본",
    greeting: "안녕! 나는 모야야.\n궁금한 말 물어봐!",
    mood: "explain",
  },
  car: {
    label: "자동차 모야",
    shortLabel: "자동차",
    greeting: "부릉부릉!\n자동차 모야 출발!",
    mood: "excited",
  },
  princess: {
    label: "공주 모야",
    shortLabel: "공주",
    greeting: "짠! 공주 모야 왔어.\n궁금한 말 물어봐!",
    mood: "greeting",
  },
};
