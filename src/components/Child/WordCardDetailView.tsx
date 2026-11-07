import notebookCard from "../../assets/icons/word-book.svg";
import { getWordIcon } from "../../constants/wordIcons";
import { iya } from "../../utils/josa";
import type { LearnedWordDetail } from "../../api/wordbook";

export default function WordCardDetailView({
  card,
}: {
  card: LearnedWordDetail;
}) {
  // 서버 그림이 없으면 단어 이름으로 로컬 아이콘을 찾는다
  const image = card.imageUrl ?? getWordIcon(card.word);

  return (
    <section className="h-[302px] w-[354px] gap-2.5 rounded-3xl bg-white shadow-word-card">
      {/* 내 카드 라벨 */}
      <div className="flex items-center gap-2 rounded-t-3xl bg-lime-card px-[18px] py-2.5">
        <img src={notebookCard} className="h-5 w-5" />
        <span className="font-jua text-base leading-5 font-normal text-ink">
          내 카드
        </span>
      </div>

      <div className="flex flex-col items-center gap-2.5 pt-2.5 pb-[22px]">
        {image && <img src={image} className="h-30 w-30 object-contain" />}

        <p className="font-jua font-normal text-ink">
          <span className="text-5xl">{card.word}</span>
          <span className="ml-[6px] text-2xl text-ink-muted">
            {iya(card.word)}
          </span>
        </p>

        <hr className="h-[2px] w-[306px] border-line-cream" />

        <p className="text-center font-noto text-base leading-6 font-bold text-ink">
          {card.description}
        </p>
      </div>
    </section>
  );
}
