import Button from "../common/Button/Button";
import Moya from "../common/Moya/Moya";
import SpeechBubble from "../common/SpeechBubble/SpeechBubble";
import { speak } from "../../utils/speak";

const LINE = "마이크가 꺼져 있어서\n네 목소리가 안 들려!";

const GUIDE_STEPS = [
  "설정 앱을 열어요",
  "Safari → 마이크를 눌러요",
  "'허용'으로 바꿔요",
];

interface MicPermissionOffProps {
  onRetry: () => void;
  onAskGuardian: () => void;
}

export default function MicPermissionOff({
  onRetry,
  onAskGuardian,
}: MicPermissionOffProps) {
  return (
    <section
      role="alert"
      className="flex min-h-0 flex-1 flex-col items-center gap-[22px] overflow-y-auto px-6 pt-[18px] pb-5"
    >
      <SpeechBubble text={LINE} onReplay={() => speak(LINE)} />

      <Moya look="default" mood="confused" size={160} />

      <div className="flex w-full flex-col items-start gap-2 px-6">
        <p className="font-jua text-base leading-6 font-normal text-ink">
          보호자님, 이렇게 켜 주세요
        </p>
        <ol className="flex flex-col gap-2">
          {GUIDE_STEPS.map((step, index) => (
            <li
              key={step}
              className="font-noto text-sm leading-5 font-bold text-ink-soft"
            >
              {index + 1}. {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-auto flex w-full flex-col gap-3">
        <Button
          text="다시 해 볼래"
          size="normal"
          icon="reset"
          fullWidth
          onClick={onRetry}
        />
        <Button
          text="보호자에게 도움 요청"
          variant="dashed"
          size="normal"
          icon="lock"
          fullWidth
          onClick={onAskGuardian}
        />
      </div>
    </section>
  );
}
