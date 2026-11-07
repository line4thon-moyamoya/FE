import { useEffect } from "react";
import { useChildMode } from "../../contexts/ChildModeContext";
import { Navigate, useParams } from "react-router-dom";
import BackButton from "../../components/common/BackButton/BackButton";
import WordCardDetailView from "../../components/Child/WordCardDetailView";
import { findWord } from "../../mocks/words";
import { getCollectedCards, markCardAsSeen } from "../../mocks/notebook";
import { iya } from "../../utils/josa";
import speaker from "../../assets/icons/speaker.svg";
import { speak } from "../../utils/speak";

export default function WordCardDetail() {
  const { wordId } = useParams();
  const { child } = useChildMode();

  const word = wordId ? findWord(wordId) : undefined;
  const hasCard = getCollectedCards(child.id).some((c) => c.wordId === wordId);

  // 상세를 보면 NEW 뱃지 제거
  useEffect(() => {
    if (wordId && hasCard) markCardAsSeen(child.id, wordId);
  }, [child.id, wordId, hasCard]);

  // 페이지를 나가면 읽던 소리 멈추기
  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  // 없는 단어이거나 아직 안 모은 카드면 수첩으로
  if (!word || !hasCard) return <Navigate to="/notebook" replace />;

  const handleListen = () =>
    speak(`${word.word}${iya(word.word)}. ${word.meaning}`);

  return (
    <>
      <header className="flex items-center gap-2.5 pl-6 pt-[18px]">
        <BackButton />
        <h1 className="font-jua text-xl leading-7 text-[#241F48]">
          단어 수첩
        </h1>
      </header>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 pt-[36px] pb-6">
        <WordCardDetailView word={word} />

        <button
          type="button"
          onClick={handleListen}
          className="cursor-pointer flex w-full h-[60px] items-center justify-center gap-2 rounded-[20px] bg-[#7B61F8] font-jua text-xl text-white shadow-[0px_4px_0px_0px_rgba(74,53,201,1.00)]"
        >
          <img src={speaker} alt="" className="w-5 h-5" />
          다시 들어볼래
        </button>
      </div>

    </>
  );
}
