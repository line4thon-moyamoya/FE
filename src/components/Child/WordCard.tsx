import ReplayButton from "../common/ReplayButton/ReplayButton";
import { getWordIcon } from "../../constants/wordIcons";

interface WordCardProps {
  word: string;
  /** 단어 뜻 한 줄 */
  description: string;
  onReplay?: () => void;
}

export default function WordCard({ word, description, onReplay }: WordCardProps) {
  const icon = getWordIcon(word);

  return (
    <div className="flex w-full flex-col items-center gap-2.5 rounded-[28px] bg-white py-[22px] shadow-word-card">
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
