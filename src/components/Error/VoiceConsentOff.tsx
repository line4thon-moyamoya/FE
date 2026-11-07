import Button from "../common/Button/Button";
import Moya from "../common/Moya/Moya";
import SpeechBubble from "../common/SpeechBubble/SpeechBubble";
import { speak } from "../../utils/speak";

const LINE = "지금은 모야가\n네 목소리를 못 들어!";

interface VoiceConsentOffProps {
  onAgreeAgain: () => void;
}

export default function VoiceConsentOff({
  onAgreeAgain,
}: VoiceConsentOffProps) {
  return (
    <section className="flex flex-1 flex-col items-center gap-[22px] px-6 pt-10">
      <SpeechBubble text={LINE} onReplay={() => speak(LINE)} />

      <Moya look="default" mood="confused" size={160} className="mt-4" />

      <div className="mt-4 flex flex-col items-start gap-2 text-left">
        <p className="font-jua text-xl leading-8 font-normal text-ink">
          보호자님, 음성 수집 동의가 꺼져 있어요
        </p>
        <p className="font-noto text-sm leading-5 font-bold text-ink-soft">
          다시 동의하면 모야와 바로 이야기할 수 있어요.
          <br />그 전에는 화면만 둘러볼 수 있어요.
        </p>
      </div>

      <Button
        text="다시 동의하기"
        size="normal"
        icon="check"
        fullWidth
        className="mt-[38px]"
        onClick={onAgreeAgain}
      />
    </section>
  );
}
