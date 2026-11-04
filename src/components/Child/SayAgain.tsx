import MicButton from "../common/MicButton/MicButton";
import Moya from "../common/Moya/Moya";
import SpeechBubble from "../common/SpeechBubble/SpeechBubble";
import Sparkle from "./Sparkle";
import { getCurrentLook } from "../../utils/currentLook";

interface SayAgainProps {
  /** 다시 말하기 버튼 */
  onRetry: () => void;
}

export default function SayAgain({ onRetry }: SayAgainProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[22px] px-6 pt-[18px] pb-[14px]">
      <div className="flex h-[100px] w-[270px] flex-col justify-end">
        <SpeechBubble text={"앗, 잘 못 들었어.\n한 번만 더 말해줄래?"} />
      </div>

      <div className="relative h-[276px] w-[300px]">
        <Moya
          look={getCurrentLook()}
          mood="confused"
          size={290}
          glow
          className="absolute -top-[14px] left-[5px]"
        />
        <Sparkle size={24} left={17} top={65} />
        <Sparkle size={18} left={41} top={93} />
        <Sparkle size={18} left={232} top={47} />
      </div>

      <MicButton state="idle" label="다시 말하기" onClick={onRetry} />
    </div>
  );
}
