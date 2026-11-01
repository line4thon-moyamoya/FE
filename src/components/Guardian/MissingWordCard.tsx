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

  if (pendingWords.length === 0) return null;

  const firstWord = pendingWords[0].heardText;
  const restCount = pendingWords.length - 1;

  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer flex w-full justify-start items-center gap-3 bg-white rounded-3xl p-4 shadow-[0px_5px_0px_0px_rgba(231,228,243,1.00)] text-left"
    >
      <div className="flex gap-3">
        <img src={mailbox} className="w-13 h-13" />
        <div className="flex flex-col gap-1 w-[228px]">
          <p className="font-jua font-normal text-base leading-6 text-[#241F48]">
            모야가 못 찾은 말 {pendingWords.length}개
          </p>
          <p className="text-sm font-bold font-noto leading-5 text-[#6F6A8C]">
            ‘{firstWord}’{restCount > 0 && ` 외 ${restCount}개`}
          </p>
        </div>
      </div>

      <img src={right} className="w-[18px] h-[18px]" />
    </button>
  );
}
