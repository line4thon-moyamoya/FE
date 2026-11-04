import wordBox from "../../assets/icons/word-box.svg";
import Button from "../common/Button/Button";
import Moya from "../common/Moya/Moya";
import SpeechBubble from "../common/SpeechBubble/SpeechBubble";
import { getCurrentLook } from "../../utils/currentLook";

interface AskLaterProps {
  /** 알았어! */
  onConfirm: () => void;
  /** 다른 말 물어볼래 */
  onAskAnother: () => void;
}

export default function AskLater({ onConfirm, onAskAnother }: AskLaterProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[22px] px-6 pt-[18px] pb-[14px]">
      <SpeechBubble text={"어른한테 같이 물어보자!\n모야가 기억할게!"} width={290} />

      <Moya look={getCurrentLook()} mood="explain" size={190} />

      <div className="flex w-full flex-col">
        {/* 물어볼 단어 상자 안내 */}
        <div className="flex items-center gap-3.5 rounded-[22px] py-3.5 pr-4 pl-3.5">
          <img src={wordBox} alt="" className="h-15 w-15 shrink-0" />
          <span className="font-jua text-[15px] leading-[1.3] font-normal text-ink">
            물어볼 단어 상자에 넣었어
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <Button text="알았어!" size="normal" icon="check" fullWidth onClick={onConfirm} />
          <Button
            text="다른 말 물어볼래"
            variant="secondary"
            size="normal"
            icon="mic"
            fullWidth
            onClick={onAskAnother}
          />
        </div>
      </div>
    </div>
  );
}
