import api from "./api";
import type { AgeGroup, SignupData } from "../types/signup";

export const AGE_GROUP_MAP: Record<AgeGroup, string> = {
  "3-4": "AGE_3_4",
  "5": "AGE_5",
};

const CONSENT_ID = {
  TERMS_OF_SERVICE: 1,
  PRIVACY_POLICY: 2,
  LEGAL_GUARDIAN: 3,
  VOICE_PROCESSING: 4,
} as const;

const toSignupRequest = (data: SignupData) => ({
  email: data.email.trim(),
  password: data.password,
  parentPin: data.pin,
  child: {
    nickname: data.childName.trim(),
    ageGroup: data.childAge ? AGE_GROUP_MAP[data.childAge] : null,
  },
  consents: [
    { consentId: CONSENT_ID.TERMS_OF_SERVICE, isAgreed: data.agreeTerms },
    { consentId: CONSENT_ID.PRIVACY_POLICY, isAgreed: data.agreePrivacy },
    { consentId: CONSENT_ID.LEGAL_GUARDIAN, isAgreed: data.agreeGuardian },
    { consentId: CONSENT_ID.VOICE_PROCESSING, isAgreed: data.agreeVoice },
  ],
});

export const signup = async (data: SignupData) => {
  const response = await api.post("/api/v1/auth/signup", toSignupRequest(data));
  return response.data.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post("/api/v1/auth/login", {
    email: email.trim(),
    password,
  });
  return response.data.data;
};

// 저장된 인증 정보 삭제
export const clearAuth = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("childId");
  sessionStorage.removeItem("parentModeToken");
};

export const logout = async () => {
  try {
    await api.post("/api/v1/auth/logout");
  } finally {
    clearAuth(); // 서버 요청이 실패해도 클라이언트 토큰은 삭제
  }
};

export const verifyParentPin = async (pin: string) => {
  const response = await api.post("/api/v1/auth/parent-pin/verify", {
    parentPin: pin,
  });
  const { parentModeToken } = response.data.data;
  sessionStorage.setItem("parentModeToken", parentModeToken);
  return parentModeToken;
};
