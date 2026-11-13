import MicButton from "../common/MicButton/MicButton";
import Moya from "../common/Moya/Moya";
import SpeechBubble from "../common/SpeechBubble/SpeechBubble";
import Sparkle from "./Sparkle";
import { useChildMode } from "../../contexts/ChildModeContext";

interface SayAgainProps {
  /** 다시 말하기 버튼 */
  onRetry: () => void;
}

export default function SayAgain({ onRetry }: SayAgainProps) {
  const { child } = useChildMode();
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[22px] px-6 pt-[18px] pb-[14px]">
      <div className="flex h-[100px] w-full max-w-[270px] flex-col justify-end">
        <SpeechBubble text={"앗, 잘 못 들었어.\n한 번만 더 말해줄래?"} />
      </div>

      <div
        className="relative aspect-[300/276] w-[calc(73.9%+35px)] max-w-[300px] shrink-0"
      >
        <Moya
          look={child.look}
          mood="confused"
          size="96.67%"
          glow
          className="absolute -top-[5.07%] left-[1.67%]"
        />
        <Sparkle size="8%" left="5.67%" top="23.55%" />
        <Sparkle size="6%" left="13.67%" top="33.7%" />
        <Sparkle size="6%" left="77.33%" top="17.03%" />
      </div>

      <MicButton state="idle" label="다시 말하기" onClick={onRetry} />
    </div>
  );
}
