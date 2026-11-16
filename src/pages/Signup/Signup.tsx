import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { SignupData } from "../../types/signup";
import StepHeader from "../../components/Signup/StepHeader";
import GuardianStep from "./steps/GuardianStep";
import ChildProfileStep from "./steps/ChildProfileStep";
import VoiceConsentStep from "./steps/VoiceConsentStep";
import PinStep from "./steps/PinStep";
import MicPermissionStep from "./steps/MicPermissionStep";
import { clearAuth, signup } from "../../api/auth";
import { setCurrentChildId } from "../../utils/currentChild";

/** 서버가 거부한 이유별로 돌아갈 단계. 없으면 PIN 단계에 머문다 */
const STEP_BY_ERROR: Record<string, number> = {
  AUTH400_INVALID_EMAIL: 1,
  AUTH409: 1,
  CONSENT400: 1,
  CONSENT404: 1,
  CHILD400_INVALID_AGE: 2,
};

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // 가입 실패 문구. 어느 단계가 문제였는지에 따라 그 단계로 돌려보낸다
  const [signupError, setSignupError] = useState<string | null>(null);
  const [data, setData] = useState<SignupData>({
    email: "",
    password: "",
    agreeTerms: false,
    agreePrivacy: false,
    agreeGuardian: false,
    childName: "",
    childAge: null,
    agreeVoice: false,
    pin: "",
  });

  // 최신 입력값을 바로 읽기 위한 ref
  const dataRef = useRef(data);

  // 일부 값만 바꿀 때 사용
  const updateData = (value: Partial<SignupData>) => {
    dataRef.current = { ...dataRef.current, ...value };
    setData((prev) => ({ ...prev, ...value }));
  };

  const goNext = () => setStep((prev) => prev + 1);
  const goBack = () =>
    step === 1 ? navigate(-1) : setStep((prev) => prev - 1);

  // PIN 입력 완료 후 회원가입 요청
  const handleSignup = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      clearAuth(); // 이전 계정 정보 정리

      const result = await signup(dataRef.current);
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      setCurrentChildId(result.childId);

      goNext();
    } catch (error) {
      const response = axios.isAxiosError(error) ? error.response : null;
      const code: string = response?.data?.code ?? "";
      const message: string =
        response?.data?.message ?? "회원가입에 실패했어요. 다시 시도해 주세요.";

      // 문제가 된 입력이 있는 단계로 돌려보낸다. PIN 은 다시 받는다
      setSignupError(message);
      updateData({ pin: "" });
      if (STEP_BY_ERROR[code]) setStep(STEP_BY_ERROR[code]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <StepHeader step={step} totalSteps={5} onBack={goBack} />

      {step === 1 && (
        <GuardianStep
          data={data}
          updateData={updateData}
          onNext={goNext}
          error={signupError}
          onClearError={() => setSignupError(null)}
        />
      )}
      {step === 2 && (
        <ChildProfileStep data={data} updateData={updateData} onNext={goNext} />
      )}
      {step === 3 && (
        <VoiceConsentStep data={data} updateData={updateData} onNext={goNext} />
      )}
      {step === 4 && (
        <PinStep
          data={data}
          updateData={updateData}
          onNext={handleSignup}
          error={signupError}
          onClearError={() => setSignupError(null)}
        />
      )}
      {step === 5 && (
        <MicPermissionStep
          onNext={() =>
            navigate("/ready", { state: { childName: data.childName.trim() } })
          }
        />
      )}
    </div>
  );
}
