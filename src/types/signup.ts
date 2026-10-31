export type AgeGroup = "3-4" | "5";

export interface SignupData {
  email: string;
  password: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeGuardian: boolean;
  childName: string;
  childAge: AgeGroup | null;
  agreeVoice: boolean;
  pin: string;
}

// 단계 컴포넌트 공통 props
export interface StepProps {
  data: SignupData;
  updateData: (value: Partial<SignupData>) => void;
  onNext: () => void;
}