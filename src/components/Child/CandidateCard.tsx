import ReplayButton from "../common/ReplayButton/ReplayButton";
import { getWordIcon } from "../../constants/wordIcons";

interface CandidateCardProps {
  word: string;
  hint: string;
  onReplay?: () => void;
  onClick?: () => void;
}

export default function CandidateCard({
  word,
  hint,
  onReplay,
  onClick,
}: CandidateCardProps) {
  const icon = getWordIcon(word);

  return (
    // 안에 다시 듣기 버튼이 들어가므로 바깥은 div 로 둠 (button 중첩 불가)
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      className="flex w-full cursor-pointer items-center gap-3.5 rounded-[22px] bg-white
        py-3 pr-4 pl-3 shadow-candidate transition-transform duration-100 active:scale-[0.97]"
    >
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cream">
        {icon && <img src={icon} alt="" className="h-[54px] w-[54px]" />}
      </span>

      <span className="flex flex-1 flex-col gap-0.5 text-left">
        <strong className="font-jua text-[26px] leading-[1.3] font-normal text-ink">
          {word}
        </strong>
        <span className="font-noto text-[13px] leading-[1.5] font-bold text-ink-soft">
          {hint}
        </span>
      </span>

      {/* 다시 듣기는 카드 선택과 별개로 동작 */}
      <span onClick={(e) => e.stopPropagation()}>
        <ReplayButton onPlay={onReplay} />
      </span>
    </div>
  );
}
