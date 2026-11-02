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
