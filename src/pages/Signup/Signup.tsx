import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SignupData } from "../../types/signup";
import StepHeader from "../../components/Signup/StepHeader";
import GuardianStep from "./steps/GuardianStep";
import ChildProfileStep from "./steps/ChildProfileStep";
import VoiceConsentStep from "./steps/VoiceConsentStep";
import PinStep from "./steps/PinStep";
import MicPermissionStep from "./steps/MicPermissionStep";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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

  // 일부 값만 바꿀 때 사용
  const updateData = (value: Partial<SignupData>) => {
    setData((prev) => ({ ...prev, ...value }));
  };

  const goNext = () => setStep((prev) => prev + 1);
  const goBack = () =>
    step === 1 ? navigate(-1) : setStep((prev) => prev - 1);

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
        <PinStep data={data} updateData={updateData} onNext={goNext} />
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
