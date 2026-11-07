import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { SignupData } from "../../types/signup";
import { signup } from "../../api/auth";
import StepHeader from "../../components/Signup/StepHeader";
import GuardianStep from "./steps/GuardianStep";
import ChildProfileStep from "./steps/ChildProfileStep";
import VoiceConsentStep from "./steps/VoiceConsentStep";
import PinStep from "./steps/PinStep";
import MicPermissionStep from "./steps/MicPermissionStep";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
      const result = await signup(dataRef.current);
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      goNext();
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : null;
      alert(message ?? "회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col ">
      <StepHeader step={step} totalSteps={5} onBack={goBack} />

      {step === 1 && (
        <GuardianStep data={data} updateData={updateData} onNext={goNext} />
      )}
      {step === 2 && (
        <ChildProfileStep data={data} updateData={updateData} onNext={goNext} />
      )}
      {step === 3 && (
        <VoiceConsentStep data={data} updateData={updateData} onNext={goNext} />
      )}
      {step === 4 && (
        <PinStep data={data} updateData={updateData} onNext={handleSignup} />
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