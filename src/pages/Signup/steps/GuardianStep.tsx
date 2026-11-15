import type { StepProps } from "../../../types/signup";
import { isValidEmail } from "../../../utils/email";
import Input from "../../../components/common/Input/Input";
import Button from "../../../components/common/Button/Button";
import AgreeCheckbox from "../../../components/Signup/AgreeCheckBox";

interface GuardianStepProps extends StepProps {
  /** 가입 단계에서 서버가 돌려보낸 문구 */
  error?: string | null;
  onClearError?: () => void;
}

export default function GuardianStep({
  data,
  updateData,
  onNext,
  error,
  onClearError,
}: GuardianStepProps) {
  const emailTyped = data.email.trim().length > 0;
  const emailOk = isValidEmail(data.email);

  const canNext =
    emailOk &&
    data.password &&
    data.agreeTerms &&
    data.agreePrivacy &&
    data.agreeGuardian;

  return (
    <div className="flex min-h-0 flex-1 flex-col px-6">
      <h1 className="font-jua font-normal leading-9 mt-6 text-2xl text-[#241F48]">
        보호자 계정을 만들어 주세요
      </h1>

      {/* 입력창 */}
      <div className="mt-6 flex flex-col gap-4">
        <Input
          label="이메일"
          type="email"
          value={data.email}
          onChange={(v) => {
            onClearError?.();
            updateData({ email: v });
          }}
          placeholder="이메일을 입력해주세요."
          error={
            error ??
            (emailTyped && !emailOk
              ? "올바른 이메일 형식으로 입력해 주세요."
              : null)
          }
        />
        <Input
          label="비밀번호"
          type="password"
          value={data.password}
          onChange={(v) => updateData({ password: v })}
          placeholder="비밀번호를 입력해주세요."
        />
      </div>

      {/* 동의 항목 */}
      <div className="flex flex-col mt-6 gap-[10px]">
        <AgreeCheckbox
          text="이용약관에 동의해요"
          checked={data.agreeTerms}
          onChange={(v) => updateData({ agreeTerms: v })}
        />
        <AgreeCheckbox
          text="개인정보 처리방침에 동의해요"
          checked={data.agreePrivacy}
          onChange={(v) => updateData({ agreePrivacy: v })}
        />
        <AgreeCheckbox
          text="만 14세 미만 아동의 법정대리인이에요"
          checked={data.agreeGuardian}
          onChange={(v) => updateData({ agreeGuardian: v })}
        />
      </div>

      {/* 다음 버튼 */}
      <div aria-hidden className="min-h-0 w-full flex-1 max-h-[268px]" />
      <div>
        <Button text="다음" showArrow onClick={onNext} disabled={!canNext} />
      </div>
    </div>
  );
}
