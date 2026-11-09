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

export interface WordRequest {
  wordRequestId: number;
  recognizedText: string;
  correctedWord: string | null;
  audioUrl: string | null;
  status: "PENDING" | "RESOLVED";
  createdAt: string;
  resolvedAt: string | null;
}

export const toMissingWord = (w: WordRequest) => ({
  id: w.wordRequestId,
  heardText: w.recognizedText,
  correctedText: w.correctedWord,
  audioUrl: w.audioUrl ?? "",
  askedAt: w.createdAt,
  status: w.status,
});

export const getWordRequests = async (childId?: number) => {
  const response = await api.get("/api/v1/guardian/word-requests", {
    params: childId ? { childId } : undefined,
  });
  return (response.data.data as WordRequest[]).map(toMissingWord);
};