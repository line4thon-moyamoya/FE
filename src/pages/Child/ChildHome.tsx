import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ChildHeader from "../../components/common/ChildHeader/ChildHeader";
import Footer from "../../components/common/Footer/Footer";
import AskLater from "../../components/Child/AskLater";
import CandidatePick from "../../components/Child/CandidatePick";
import ConfirmQuestion from "../../components/Child/ConfirmQuestion";
import HeardPlacePick from "../../components/Child/HeardPlacePick";
import MoyaStageView from "../../components/Child/MoyaStageView";
import RepeatAfter from "../../components/Child/RepeatAfter";
import WordLesson from "../../components/Child/WordLesson";
import SayAgain from "../../components/Child/SayAgain";
import { findChildProfile } from "../../mocks/child";
import { MOCK_CONFIRM_QUIZZES, MOCK_WORD_LESSON } from "../../mocks/talk";
import type { MoyaStage, TalkStage } from "../../types/child";
import { getCurrentChildId } from "../../utils/currentChild";

/** 생각 중에서 되묻기로 넘어가기까지 기다리는 시간 */
const THINKING_MS = 1600;

export default function ChildHome() {
  const navigate = useNavigate();
  const child = findChildProfile(getCurrentChildId());

  const [stage, setStage] = useState<TalkStage>("idle");
  // 음성 인식이 붙기 전까지는 목데이터를 순서대로 돌려 씀
  const [quizIndex, setQuizIndex] = useState(0);
  // 음성 인식이 없어 따라 말하기 결과를 번갈아 보여 줌
  const [repeatCount, setRepeatCount] = useState(0);
  const quiz = MOCK_CONFIRM_QUIZZES[quizIndex];

  // 생각이 끝나면 되묻기로 넘어감
  useEffect(() => {
    if (stage !== "thinking") return;
    const timer = window.setTimeout(() => setStage("confirm"), THINKING_MS);
    return () => window.clearTimeout(timer);
  }, [stage]);

  const startListening = () => {
    setQuizIndex((index) => (index + 1) % MOCK_CONFIRM_QUIZZES.length);
    setStage("listening");
  };

  const handleMicClick = () => {
    // 기다리는 중 -> 듣는 중 -> 생각 중.
    // 생각 중에는 버튼이 비활성이라 여기로 들어오지 않음
    if (stage === "idle") startListening();
    else setStage("thinking");
  };

  const renderMain = () => {
    if (stage === "confirm") {
      return (
        <ConfirmQuestion
          quiz={quiz}
          onConfirm={() => setStage("meaning")}
          onDeny={() => setStage("place")}
          onRetry={startListening}
        />
      );
    }

    if (stage === "place") {
      return (
        <HeardPlacePick
          onPick={() => setStage("candidates")}
          onSkip={() => setStage("askLater")}
        />
      );
    }

    if (stage === "candidates") {
      return (
        <CandidatePick
          onPick={() => setStage("meaning")}
          onDeny={() => setStage("sayAgain")}
        />
      );
    }

    if (stage === "meaning") {
      return (
        <WordLesson
          letters={MOCK_WORD_LESSON.letters}
          line={MOCK_WORD_LESSON.meaningLine}
          mood="explain"
          buttonLabel="알았어!"
          bubbleWidth={340}
          onNext={() => setStage("repeat")}
        />
      );
    }

    if (stage === "repeat") {
      return (
        <RepeatAfter
          letters={MOCK_WORD_LESSON.letters}
          word={MOCK_WORD_LESSON.word}
          onSpeak={() => {
            setRepeatCount((count) => count + 1);
            setStage(repeatCount % 2 === 0 ? "repeatSuccess" : "repeatRetry");
          }}
        />
      );
    }

    if (stage === "repeatSuccess") {
      return (
        <WordLesson
          letters={MOCK_WORD_LESSON.letters}
          line={MOCK_WORD_LESSON.successLine}
          mood="excited"
          buttonLabel="좋아!"
          sticker
          onNext={() => alert("카드 획득 화면은 준비 중이에요")}
        />
      );
    }

    if (stage === "repeatRetry") {
      return (
        <WordLesson
          letters={MOCK_WORD_LESSON.letters}
          line={MOCK_WORD_LESSON.retryLine}
          mood="explain"
          buttonLabel="알았어!"
          onNext={() => alert("카드 획득 화면은 준비 중이에요")}
        />
      );
    }

    if (stage === "askLater") {
      return (
        <AskLater
          onConfirm={() => setStage("idle")}
          onAskAnother={startListening}
        />
      );
    }

    if (stage === "sayAgain") {
      return (
        <SayAgain
          onRetry={startListening}
          onPickCard={() => setStage("place")}
        />
      );
    }

    return (
      <MoyaStageView
        stage={stage as MoyaStage}
        greeting={child.greeting}
        onMicClick={handleMicClick}
      />
    );
  };

  return (
    <main className="flex h-full flex-col bg-cream pt-[62px] pb-[113px]">
      <ChildHeader
        childName={child.name}
        coupons={child.coupons}
        onCouponClick={() => alert("노래 쿠폰은 준비 중이에요")}
        onGuardianClick={() => navigate("/guardian/password")}
      />

      {renderMain()}

      <Footer />
    </main>
  );
}
