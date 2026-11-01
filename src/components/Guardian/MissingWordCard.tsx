import type { MissingWord } from "../../types/guardian";
import mailbox from "../../assets/images/mailbox.svg";
import right from "../../assets/icons/right_icon.svg";

interface MissingWordCardProps {
  missingWords: MissingWord[];
  onClick: () => void;
}

export default function MissingWordCard({
  missingWords,
  onClick,
}: MissingWordCardProps) {
  // 아직 모야에게 안 알려준 단어만
  const pendingWords = missingWords.filter((w) => w.correctedText === null);
  const count = pendingWords.length;

  const description =
    count === 0
      ? "못 찾은 말이 없어요"
      : `‘${pendingWords[0].heardText}’${count > 1 ? ` 외 ${count - 1}개` : ""}`;

  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer flex w-full justify-start items-center gap-3 bg-white rounded-3xl p-4 shadow-[0px_5px_0px_0px_rgba(231,228,243,1.00)] text-left"
    >
      <div className="flex gap-3">
        <img src={mailbox} alt="" className="w-13 h-13" />
        <div className="flex flex-col gap-1 w-[228px]">
          <p className="font-jua font-normal text-base leading-6 text-[#241F48]">
            모야가 못 찾은 말 {count}개
          </p>
          <p className="text-sm font-bold font-noto leading-5 text-[#6F6A8C]">
            {description}
          </p>
        </div>
      </div>

      <img src={right} className="w-[18px] h-[18px]" />
    </button>
  );
}