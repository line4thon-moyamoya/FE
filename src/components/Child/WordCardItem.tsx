import stickerFilled from "../../assets/icons/sticker-filled.svg";
import stickerEmpty from "../../assets/icons/sticker-empty.svg";
import { cardColor, type LearnedWord } from "../../api/wordbook";
import { getWordIcon } from "../../constants/wordIcons";

interface WordCardItemProps {
  card: LearnedWord;
  onClick: () => void;
}

export default function WordCardItem({ card, onClick }: WordCardItemProps) {
  const { word, imageUrl, isNew, stickerEarned } = card;
  // 서버 그림이 없으면 단어 이름으로 로컬 아이콘을 찾는다
  const image = imageUrl ?? getWordIcon(word);
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="cursor-pointer relative flex w-full min-w-0 min-h-[182px] flex-col items-center gap-[6px] rounded-3xl px-2 pt-[14px] pb-4"
        style={{ backgroundColor: cardColor(card.wordId) }}
      >
        {isNew && (
          <span className="w-[46px] h-[23px] absolute top-2 left-2 rounded-full bg-[#FF6B5B] px-2 py-0.5 font-jua font-normal text-base leading-5 text-white">
            NEW
          </span>
        )}

        <img src={image} className="h-[92px] w-full max-w-[92px] shrink-0 object-contain" />
        <span className="w-full text-center font-jua text-xl font-normal leading-7 break-words text-[#241F48]">
          {word}
        </span>
        <img
          src={stickerEarned ? stickerFilled : stickerEmpty}
          className="w-5 h-5"
        />
      </button>
    </li>
  );
}
