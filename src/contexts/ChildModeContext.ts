import { createContext, use } from "react";

import type { ChildHome } from "../api/childHome";

export interface ChildModeValue {
  child: ChildHome;
  /** 모은 노래 쿠폰 수. 화면끼리 같은 값을 봄 */
  coupons: number;
  setCoupons: (next: number) => void;
  /** 노래 쿠폰 시트 열기 */
  openCouponSheet: () => void;
  /** 아이 모드 안에서 쓰는 경로를 만들어 줌 */
  childPath: (to: string) => string;
}

export const ChildModeContext = createContext<ChildModeValue | null>(null);

export function useChildMode(): ChildModeValue {
  const value = use(ChildModeContext);
  if (!value) {
    throw new Error("아이 모드 레이아웃 안에서만 쓸 수 있어요");
  }
  return value;
}
