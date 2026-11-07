import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import BackButton from "../../components/common/BackButton/BackButton";
import WordCardDetailView from "../../components/Child/WordCardDetailView";
import speaker from "../../assets/icons/speaker.svg";
import {
  getLearnedWord,
  markLearnedWordViewed,
  type LearnedWordDetail,
} from "../../api/wordbook";
import { useChildMode } from "../../contexts/ChildModeContext";
import { playAudio, stopAudio } from "../../utils/playAudio";

export default function WordCardDetail() {
  const { learnedWordId } = useParams();
  const { child, childPath } = useChildMode();
  const id = Number(learnedWordId);

  const [card, setCard] = useState<LearnedWordDetail | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!Number.isInteger(id)) return;

    let alive = true;
    getLearnedWord(child.childId, id)
      .then((data) => {
        if (!alive) return;
        setCard(data);
        // 열어 봤으니 NEW 배지를 뗀다. 실패해도 화면은 그대로 둔다
        void markLearnedWordViewed(child.childId, id).catch(() => {});
      })
      .catch(() => alive && setFailed(true));

    return () => {
      alive = false;
    };
  }, [child.childId, id]);

  // 화면을 나가면 읽던 소리 멈추기
  useEffect(() => stopAudio, []);

  if (!Number.isInteger(id) || failed) {
    return <Navigate to={childPath("notebook")} replace />;
  }

  return (
    <>
      <header className="flex items-center gap-2.5 pt-[18px] pl-6">
        <BackButton />
        <h1 className="font-jua text-xl leading-7 text-ink">단어 수첩</h1>
      </header>

      {card && (
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 pt-[36px] pb-6">
          <WordCardDetailView card={card} />

          <button
            type="button"
            onClick={() =>
              card.descriptionAudioUrl && playAudio(card.descriptionAudioUrl)
            }
            className="flex h-[60px] w-full cursor-pointer items-center justify-center gap-2
              rounded-[20px] bg-brand font-jua text-xl text-white shadow-button-primary"
          >
            <img src={speaker} alt="" className="h-5 w-5" />
            다시 들어볼래
          </button>
        </div>
      )}
    </>
  );
}
