import praiseSticker from "../../assets/icons/praise_sticker.svg";
import Button from "../common/Button/Button";
import LetterTiles from "./LetterTiles";
import Moya from "../common/Moya/Moya";
import SpeechBubble from "../common/SpeechBubble/SpeechBubble";
import type { MoyaMood } from "../../types/moya";

interface WordLessonProps {
  letters: string[];
  line: string;
  mood: MoyaMood;
  buttonLabel: string;
  /** 말풍선 가로 길이. 대사가 길면 넓게 */
  bubbleWidth?: number;
  /** 칭찬 스티커 표시 */
  sticker?: boolean;
  onNext: () => void;
  onReplay?: () => void;
}

/**
 * 뜻 알려주기 · 따라 말하기 성공 · 정답 다시 들려주기가 쓰는 공통 화면.
 */
export default function WordLesson({
  letters,
  line,
  mood,
  buttonLabel,
  bubbleWidth = 270,
  sticker = false,
  onNext,
  onReplay,
}: WordLessonProps) {
  return (
    <div className="relative flex flex-1 flex-col gap-[22px] px-6 pt-6 pb-[14px]">
      <div className="flex flex-col items-center gap-[60px]">
        <LetterTiles letters={letters} />

        <div className="flex w-full flex-col items-center gap-[22px]">
          <SpeechBubble text={line} width={bubbleWidth} onReplay={onReplay} />

          <div className="flex w-full flex-col items-center gap-9">
            <Moya look="default" mood={mood} size={210} />
            <Button
              text={buttonLabel}
              size="normal"
              icon="check"
              fullWidth
              onClick={onNext}
            />
          </div>
        </div>
      </div>

      {/* 칭찬 스티커 */}
      {sticker && (
        <img
          src={praiseSticker}
          alt=""
          aria-hidden
          className="animate-sticker-pop pointer-events-none absolute -top-0.5 right-6 h-[81px] w-[81px]"
        />
      )}
    </div>
  );
}
