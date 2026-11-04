import { useNavigate } from "react-router-dom";
import ChildHeader from "../../components/common/ChildHeader/ChildHeader";
import Footer from "../../components/common/Footer/Footer";
import SongProgressBanner from "../../components/Child/SongProgressBanner";
import WordCardItem from "../../components/Child/WordCardItem";
import { findChildProfile } from "../../mocks/child";
import { findWord } from "../../mocks/words";
import {
  getCollectedCards,
  getRemainingForNextCoupon,
} from "../../mocks/notebook";
import type { CollectedCard, Word } from "../../types/word";
import { getCurrentChildId } from "../../utils/currentChild";

type CardWithWord = { card: CollectedCard; word: Word };

export default function WordNotebook() {
  const navigate = useNavigate();
  const child = findChildProfile(getCurrentChildId());

  // 모은 카드에 단어 정보(그림, 배경색) 붙이기
  const cards = getCollectedCards(child.id)
    .map((card) => ({ card, word: findWord(card.wordId) }))
    // 단어 정보를 못 찾은 카드는 빼기
    .filter((item): item is CardWithWord => item.word !== undefined);

  const remaining = getRemainingForNextCoupon(cards.length);

  return (
    <main className="flex h-full flex-col bg-cream pt-[62px] pb-[113px]">
      <ChildHeader
        childName={child.name}
        coupons={child.coupons}
        onCouponClick={() => alert("노래 쿠폰은 준비 중이에요")}
        onGuardianClick={() => navigate("/guardian/password")}
      />

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 pt-6 pb-6">
        <h1 className="font-jua text-2xl leading-9 text-[#241F48]">
          단어 수첩
        </h1>

        <SongProgressBanner
          remaining={remaining}
          onClick={() => navigate("/song")}
        />

        {cards.length === 0 ? (
          <p className="mt-10 text-center font-jua text-base leading-6 text-[#9E98BF]">
            아직 모은 단어가 없어요.
            <br />
            모야한테 모르는 말을 물어봐!
          </p>
        ) : (
          <ul className="grid grid-cols-3 gap-2.5">
            {cards.map(({ card, word }) => (
              <WordCardItem
                key={card.wordId}
                word={word}
                isNew={card.isNew}
                reviewed={card.reviewed}
                onClick={() => navigate(`/notebook/${word.id}`)}
              />
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </main>
  );
}
