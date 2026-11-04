import type { Word } from "../../types/word";
import stickerFilled from "../../assets/icons/sticker-filled.svg";
import stickerEmpty from "../../assets/icons/sticker-empty.svg";

interface WordCardItemProps {
  word: Word;
  isNew: boolean;
  reviewed: boolean;
  onClick: () => void;
}

export default function WordCardItem({
  word,
  isNew,
  reviewed,
  onClick,
}: WordCardItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="cursor-pointer relative flex w-[110px] h-[182px] flex-col items-center gap-[6px] rounded-3xl px-2 pt-[14px] pb-4"
        style={{ backgroundColor: word.bgColor }}
      >
        {isNew && (
          <span className="w-[46px] h-[23px] absolute top-2 left-2 rounded-full bg-[#FF6B5B] px-2 py-0.5 font-jua font-normal text-base leading-5 text-white">
            NEW
          </span>
        )}

        <img src={word.image} className="w-[92px] h-[92px] object-contain" />
        <span className="font-jua text-xl font-normal leading-7 text-[#241F48]">
          {word.word}
        </span>
        <img
          src={reviewed ? stickerFilled : stickerEmpty}
          className="w-5 h-5"
        />
      </button>
    </li>
  );
}
