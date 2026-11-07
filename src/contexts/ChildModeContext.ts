import { createContext, use } from "react";

import type { ChildProfile } from "../types/child";

export interface ChildModeValue {
  child: ChildProfile;
  /** 모은 노래 쿠폰 수. 화면끼리 같은 값을 봄 */
  coupons: number;
  setCoupons: (next: number) => void;
  /** 노래 쿠폰 시트 열기 */
  openCouponSheet: () => void;
}

export const ChildModeContext = createContext<ChildModeValue | null>(null);

export function useChildMode(): ChildModeValue {
  const value = use(ChildModeContext);
  if (!value) {
    throw new Error("아이 모드 레이아웃 안에서만 쓸 수 있어요");
  }
  return value;
}
