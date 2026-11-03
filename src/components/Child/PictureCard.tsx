import ReplayButton from "../common/ReplayButton/ReplayButton";
import { getWordIcon } from "../../constants/wordIcons";

interface PictureCardProps {
  word: string;
  /** 단어를 설명하는 짧은 힌트 */
  hint: string;
  onReplay?: () => void;
  onClick?: () => void;
}

export default function PictureCard({ word, hint, onReplay, onClick }: PictureCardProps) {
  const icon = getWordIcon(word);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      className="flex h-[236px] w-[171px] cursor-pointer flex-col items-center justify-center gap-1.5
        rounded-3xl bg-white shadow-picture-card"
    >
      {icon && <img src={icon} alt="" className="h-24 w-24" />}

      <strong className="font-jua text-[40px] font-normal text-ink">{word}</strong>
      <p className="font-noto text-[13px] font-bold text-ink-muted">{hint}</p>

      {/* 다시 듣기는 카드 선택과 별개로 동작 */}
      <span onClick={(e) => e.stopPropagation()}>
        <ReplayButton onPlay={onReplay} />
      </span>
    </div>
  );
}
