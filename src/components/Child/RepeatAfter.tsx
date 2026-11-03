import soundwave from "../../assets/icons/soundwave.svg";
import LetterTiles from "./LetterTiles";
import MicButton from "../common/MicButton/MicButton";
import Moya from "../common/Moya/Moya";
import SpeechBubble from "../common/SpeechBubble/SpeechBubble";

interface RepeatAfterProps {
  letters: string[];
  word: string;
  /** 아이가 따라 말했을 때 */
  onSpeak: () => void;
}

export default function RepeatAfter({ letters, word, onSpeak }: RepeatAfterProps) {
  return (
    <div className="flex flex-1 flex-col items-center gap-[22px] px-6 pt-6 pb-[14px]">
      <LetterTiles letters={letters} />

      <SpeechBubble text={`같이 말해볼까?\n${word}!`} showReplay={false} />

      <div className="flex h-[210px] items-center">
        <img src={soundwave} alt="" aria-hidden className="h-11 w-[30px]" />
        <Moya look="default" mood="curious" size={210} />
        <img src={soundwave} alt="" aria-hidden className="h-11 w-[30px] -scale-x-100" />
      </div>

      {/* 마이크는 화면에 들어오면 이미 켜져 있는 상태로 보여 줌 */}
      <MicButton state="listening" label="따라 말해 봐!" onClick={onSpeak} />
    </div>
  );
}
