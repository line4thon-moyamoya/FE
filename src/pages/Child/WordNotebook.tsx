import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SongProgressBanner from "../../components/Child/SongProgressBanner";
import WordCardItem from "../../components/Child/WordCardItem";
import { getWordbook, type LearnedWord } from "../../api/wordbook";
import { useChildMode } from "../../contexts/ChildModeContext";

/** 카드 몇 장마다 쿠폰 한 장 */
const CARDS_PER_COUPON = 5;

export default function WordNotebook() {
  const navigate = useNavigate();
  const { child, childPath } = useChildMode();

  const [cards, setCards] = useState<LearnedWord[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    getWordbook(child.childId)
      .then((data) => alive && setCards(data.learnedWords))
      .catch(() => alive && setFailed(true));

    return () => {
      alive = false;
    };
  }, [child.childId]);

  const remaining = cards
    ? CARDS_PER_COUPON - (cards.length % CARDS_PER_COUPON)
    : CARDS_PER_COUPON;

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 pt-6 pb-6">
      <h1 className="font-jua text-2xl leading-9 text-ink">단어 수첩</h1>

      <SongProgressBanner
        remaining={remaining}
        onClick={() => navigate(childPath("song"))}
      />

      {failed ? (
        <p className="mt-10 text-center font-jua text-base leading-6 text-ink-muted">
          수첩을 못 가져왔어.
          <br />
          다시 들어와 줄래?
        </p>
      ) : !cards ? (
        <div aria-busy className="flex-1" />
      ) : cards.length === 0 ? (
        <p className="mt-10 text-center font-jua text-base leading-6 text-ink-muted">
          아직 모은 단어가 없어요.
          <br />
          모야한테 모르는 말을 물어봐!
        </p>
      ) : (
        <ul className="grid grid-cols-3 gap-2.5">
          {cards.map((card) => (
            <WordCardItem
              key={card.learnedWordId}
              card={card}
              onClick={() =>
                navigate(childPath(`notebook/${card.learnedWordId}`))
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
}
