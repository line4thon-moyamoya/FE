import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ChildHeader from "../../components/common/ChildHeader/ChildHeader";
import Footer from "../../components/common/Footer/Footer";
import BackButton from "../../components/common/BackButton/BackButton";
import WordCardDetailView from "../../components/Child/WordCardDetailView";
import { findChildProfile } from "../../mocks/child";
import { findWord } from "../../mocks/words";
import { getCollectedCards, markCardAsSeen } from "../../mocks/notebook";
import { getCurrentChildId } from "../../utils/currentChild";
import { iya } from "../../utils/josa";
import speaker from "../../assets/icons/speaker.svg";

export default function WordCardDetail() {
  const navigate = useNavigate();
  const { wordId } = useParams();
  const child = findChildProfile(getCurrentChildId());

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

  const handleListen = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `${word.word}${iya(word.word)}. ${word.meaning}`,
    );
    utterance.lang = "ko-KR";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="flex h-full flex-col bg-cream pt-[62px] pb-[113px]">
      <ChildHeader
        childName={child.name}
        coupons={child.coupons}
        onCouponClick={() => alert("노래 쿠폰은 준비 중이에요")}
        onGuardianClick={() => navigate("/guardian/password")}
      />

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

      <Footer />
    </main>
  );
}
