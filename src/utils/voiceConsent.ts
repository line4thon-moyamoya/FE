const KEY = "voiceConsent";

// 저장된 값이 없으면 회원가입 때 동의한 것으로 보고 true
export const getVoiceConsent = (): boolean => {
  return localStorage.getItem(KEY) !== "false";
};

// API 연동 시 동의 변경 요청으로 교체
export const setVoiceConsent = (agreed: boolean) => {
  localStorage.setItem(KEY, String(agreed));
};