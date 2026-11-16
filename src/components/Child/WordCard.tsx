import ReplayButton from "../common/ReplayButton/ReplayButton";
import RetryButton from "../common/RetryButton/RetryButton";
import { getWordImage } from "../../constants/wordIcons";

interface WordCardProps {
  word: string;
  /** 단어 뜻 한 줄 */
  description: string;
  onReplay?: () => void;
  /** 서버가 준 단어 그림. 없으면 내장 아이콘을 쓴다 */
  imageUrl?: string | null;
  /** 다시 말하기. 넘기면 카드 오른쪽 위에 버튼이 붙는다 */
  onRetry?: () => void;
}

export default function WordCard({
  word,
  description,
  onReplay,
  imageUrl,
  onRetry,
}: WordCardProps) {
  const icon = getWordImage(imageUrl, word);

  return (
    <div className="relative flex w-full flex-col items-center gap-2.5 rounded-[28px] bg-white py-[22px] shadow-word-card">
      {onRetry && (
        <div className="absolute top-4 right-4">
          <RetryButton onClick={onRetry} />
        </div>
      )}

      {icon && <img src={icon} alt="" className="h-[132px] w-[132px]" />}

      <div className="flex flex-col items-center gap-[30px]">
        <div className="flex flex-col items-center gap-1">
          <strong className="font-jua text-[44px] leading-[1.15] font-normal text-ink">
            {word}
          </strong>
          <p className="font-noto text-[15px] leading-[1.55] font-bold text-ink-soft">
            {description}
          </p>
        </div>

        <ReplayButton onPlay={onReplay} />
      </div>
    </div>
  );
}
