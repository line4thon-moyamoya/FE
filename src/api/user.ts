import api from "./api";
import { toAgeGroup, toMoyaLook } from "./child";

interface SettingsResponse {
  children: {
    childId: number;
    nickname: string;
    ageGroup: string;
    moyaType: string | null;
  }[];
  voiceProcessingAgreed: boolean;
  voiceImprovementAgreed: boolean;
}

export const getSettings = async () => {
  const response = await api.get("/api/v1/users/me/settings");
  const data = response.data.data as SettingsResponse;

  return {
    children: data.children.map((c) => ({
      id: c.childId,
      name: c.nickname,
      ageGroup: toAgeGroup(c.ageGroup),
      moyaLook: toMoyaLook(c.moyaType),
    })),
    voiceProcessingAgreed: data.voiceProcessingAgreed,
    voiceImprovementAgreed: data.voiceImprovementAgreed,
  };
};

export type SettingsChild = Awaited<ReturnType<typeof getSettings>>["children"][number];