import api from "./api";
import type { AgeGroup, SignupData } from "../types/signup";

const AGE_GROUP_MAP: Record<AgeGroup, string> = {
  "3-4": "AGE_3_4",
  "5": "AGE_5",
};

// 화면 데이터 → 서버 요청 형식
const toSignupRequest = (data: SignupData) => ({
  email: data.email.trim(),
  password: data.password,
  parentPin: data.pin,
  child: {
    nickname: data.childName.trim(),
    ageGroup: data.childAge ? AGE_GROUP_MAP[data.childAge] : null,
  },
  consents: [
    { consentId: 1, isAgreed: data.agreeTerms },
    { consentId: 2, isAgreed: data.agreePrivacy },
    { consentId: 3, isAgreed: data.agreeGuardian },
    { consentId: 4, isAgreed: data.agreeVoice },
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
