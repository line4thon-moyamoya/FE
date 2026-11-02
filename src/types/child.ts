import type { MoyaLook } from "./moya";

/** 아이 모드에서 쓰는 아이 정보 */
export interface ChildProfile {
  id: number;
  name: string;
  /** 아이가 고른 모야 변신 */
  look: MoyaLook;
  /** 모은 노래 쿠폰 수 (0~5) */
  coupons: number;
  /** 홈에서 모야가 건네는 말 */
  greeting: string;
}

/**
 * 모야와 나누는 대화의 단계
 *   idle      기다리는 중. 말하기 버튼을 누르면 시작
 *   listening 아이 말을 듣는 중
 *   thinking  들은 말이 무슨 뜻인지 찾는 중
 */
export type TalkStage = "idle" | "listening" | "thinking";
