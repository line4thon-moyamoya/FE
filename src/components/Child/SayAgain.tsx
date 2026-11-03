import Button from "../common/Button/Button";
import MicButton from "../common/MicButton/MicButton";
import Moya from "../common/Moya/Moya";
import SpeechBubble from "../common/SpeechBubble/SpeechBubble";

interface SayAgainProps {
  /** 다시 말하기 버튼 */
  onRetry: () => void;
  /** 글자 카드로 고를래 */
  onPickCard: () => void;
}

export default function SayAgain({ onRetry, onPickCard }: SayAgainProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[22px] px-6 pt-[18px] pb-[14px]">
      <SpeechBubble text={"앗, 잘 못 들었어.\n한 번만 더 말해줄래?"} />

      <div className="relative h-[200px] w-[300px]">
        <Moya look="default" mood="confused" size={200} className="absolute left-[50px]" />
      </div>

      <div className="flex w-full flex-col items-center gap-9">
        <MicButton state="idle" label="다시 말하기" onClick={onRetry} />

        <Button
          text="글자 카드로 고를래"
          variant="dashed"
          size="normal"
          icon="wordBook"
          fullWidth
          onClick={onPickCard}
        />
      </div>
    </div>
  );
}
