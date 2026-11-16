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

interface UpdateChildData {
  nickname?: string;
  ageGroup?: AgeGroup;
  moyaLook?: MoyaLook;
}

export const addChild = async ({
  nickname,
  ageGroup,
  moyaLook,
}: AddChildData) => {
  const response = await api.post("/api/v1/children", {
    nickname: nickname.trim(),
    ageGroup: AGE_GROUP_MAP[ageGroup],
    moyaType: moyaLook ? MOYA_TYPE_MAP[moyaLook] : null, // null 이면 DEFAULT
  });
  return response.data.data;
};

/**
 * 첫 실행 때 고른 모야를 저장한다.
 * 일반 아이 정보 수정과 달리 로그인 토큰만 있으면 돼서 보호자 인증이 필요 없다.
 */
export const setInitialMoyaLook = async (childId: number, look: MoyaLook) => {
  const response = await api.patch(
    `/api/v1/children/${childId}/initial-profile`,
    { moyaType: MOYA_TYPE_MAP[look] },
  );
  return response.data.data as { childId: number; moyaType: string };
};

export const toAgeGroup = (serverValue: string): AgeGroup =>
  serverValue === "AGE_5" ? "5" : "3-4";

export const toMoyaLook = (serverValue: string | null): MoyaLook =>
  (serverValue?.toLowerCase() ?? "default") as MoyaLook;

export const updateChild = async (childId: number, data: UpdateChildData) => {
  // 바뀐 필드만 담기 (null은 보내지 않는다)
  const body: Record<string, string> = {};
  if (data.nickname !== undefined) body.nickname = data.nickname.trim();
  if (data.ageGroup !== undefined) body.ageGroup = AGE_GROUP_MAP[data.ageGroup];
  if (data.moyaLook !== undefined) body.moyaType = MOYA_TYPE_MAP[data.moyaLook];

  const response = await api.patch(`/api/v1/children/${childId}`, body);
  return response.data.data;
};
