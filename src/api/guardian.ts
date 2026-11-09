import api from "./api";

export interface GuardianHomeData {
  children: { childId: number; name: string }[];
  selectedChildId: number;
  childName: string;
  weekStartDate: string;
  weekEndDate: string;
  questionCount: number;
  unrecognizedCount: number;
  pendingRequestCount: number;
  pendingRequestPreview: { wordRequestId: number; recognizedText: string }[];
}

export const getGuardianHome = async (childId?: number) => {
  const response = await api.get("/api/v1/guardian/home", {
    params: childId ? { childId } : undefined,
  });
  return response.data.data as GuardianHomeData;
};