import api from "./api";
import { AGE_GROUP_MAP } from "./auth";
import type { AgeGroup } from "../types/signup";
import type { MoyaLook } from "../types/moya";

export const MOYA_TYPE_MAP: Record<MoyaLook, string> = {
  default: "DEFAULT",
  car: "CAR",
  princess: "PRINCESS",
};

interface AddChildData {
  nickname: string;
  ageGroup: AgeGroup;
  moyaLook: MoyaLook | null;
}

export const addChild = async ({ nickname, ageGroup, moyaLook }: AddChildData) => {
  const response = await api.post("/api/v1/children", {
    nickname: nickname.trim(),
    ageGroup: AGE_GROUP_MAP[ageGroup],
    moyaType: moyaLook ? MOYA_TYPE_MAP[moyaLook] : null, // null 이면 DEFAULT
  });
  return response.data.data;
};

export const toAgeGroup = (serverValue: string): AgeGroup =>
  serverValue === "AGE_5" ? "5" : "3-4";

export const toMoyaLook = (serverValue: string | null): MoyaLook =>
  (serverValue?.toLowerCase() ?? "default") as MoyaLook;