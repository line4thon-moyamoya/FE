import type { StepProps } from "../../../types/signup";
import VoiceNoticeCard from "../../../components/Signup/VoiceNoticeCard";
import AgreeCheckbox from "../../../components/Signup/AgreeCheckBox";
import Button from "../../../components/common/Button/Button";

export default function VoiceConsentStep({
  data,
  updateData,
  onNext,
}: StepProps) {
  const canNext = data.agreeVoice;
  return (
    <div className="flex flex-col gap-6 pl-6">
      <h1 className="mt-6 font-jua text-2xl leading-9 font-normal text-[#241F48]">
        아이 목소리 사용에
        <br />
        동의해 주세요
      </h1>
      <VoiceNoticeCard />
      <AgreeCheckbox
        text="음성 수집·이용에 동의해요"
        checked={data.agreeVoice}
        onChange={(v) => updateData({ agreeVoice: v })}
      />
      <div className="mt-[248px]">
        <Button text="동의하고 다음" showArrow onClick={onNext} disabled={!canNext} />
      </div>
    </div>
  );
}
