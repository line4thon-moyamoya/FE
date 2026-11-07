import api from "./api";
import type { MoyaLook } from "../types/moya";

/** 서버가 쓰는 모야 유형 */
type ServerMoyaType = "DEFAULT" | "CAR" | "PRINCESS";

const MOYA_LOOK_BY_TYPE: Record<ServerMoyaType, MoyaLook> = {
  DEFAULT: "default",
  CAR: "car",
  PRINCESS: "princess",
};

export type AgeGroup = "AGE_3_4" | "AGE_5";

interface ChildHomeResponse {
  childId: number;
  nickname: string;
  ageGroup: AgeGroup;
  moyaType: ServerMoyaType;
  songCouponCount: number;
}

/** 아이 모드 전체가 함께 보는 아이 정보 */
export interface ChildHome {
  childId: number;
  nickname: string;
  ageGroup: AgeGroup;
  look: MoyaLook;
  coupons: number;
}

export const getChildHome = async (childId: number): Promise<ChildHome> => {
  const response = await api.get(`/api/v1/children/${childId}/home`);
  const data: ChildHomeResponse = response.data.data;

  return {
    childId: data.childId,
    nickname: data.nickname,
    ageGroup: data.ageGroup,
    look: MOYA_LOOK_BY_TYPE[data.moyaType] ?? "default",
    coupons: data.songCouponCount,
  };
};
