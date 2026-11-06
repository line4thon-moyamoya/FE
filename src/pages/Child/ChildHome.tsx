import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ChildHeader from "../../components/common/ChildHeader/ChildHeader";
import Footer from "../../components/common/Footer/Footer";
import AskLater from "../../components/Child/AskLater";
import CandidatePick from "../../components/Child/CandidatePick";
import CardEarned from "../../components/Child/CardEarned";
import CouponSheet from "../../components/Child/CouponSheet";
import SongCompleteModal from "../../components/Child/SongCompleteModal";
import ConfirmQuestion from "../../components/Child/ConfirmQuestion";
import HeardPlacePick from "../../components/Child/HeardPlacePick";
import MoyaStageView from "../../components/Child/MoyaStageView";
import RepeatAfter from "../../components/Child/RepeatAfter";
import WordLesson from "../../components/Child/WordLesson";
import SayAgain from "../../components/Child/SayAgain";
import ConnectionLost from "../../components/Error/ConnectionLost";
import MicPermissionOff from "../../components/Error/MicPermissionOff";
import VoiceConsentOff from "../../components/Error/VoiceConsentOff";
import useVoiceRecording, { MIN_RECORD_MS } from "../../hooks/useVoiceRecording";
import { findChildProfile } from "../../mocks/child";
import {
  MOCK_CONFIRM_QUIZZES,
  MOCK_EARNED_CARD,
  MOCK_SONG_WORDS,
  mockRecognize,
  MOCK_WORD_LESSON,
} from "../../mocks/talk";
import { COUPON_GOAL } from "../../types/child";
import type { ChildErrorType, MoyaStage, TalkStage } from "../../types/child";
import { MOYA_LOOK_INFO } from "../../constants/moyaLook";
import { getCurrentChildId } from "../../utils/currentChild";
import { getCurrentLook } from "../../utils/currentLook";
import { getVoiceConsent, setVoiceConsent } from "../../utils/voiceConsent";
import { requestMicPermission } from "../../utils/micPermission";
import { isOnline } from "../../utils/network";
import { getDebugError } from "../../utils/debugError";

/** 생각 중에서 되묻기로 넘어가기까지 기다리는 시간 */
const THINKING_MS = 1600;

/** 모야를 막 고르고 들어왔을 때 첫인사를 건네는 시간 */
const INTRO_MS = 1500;

export default function ChildHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const child = findChildProfile(getCurrentChildId());
  const look = getCurrentLook();

  // 모야를 막 고르고 들어왔으면 그 모야다운 첫인사를 먼저 건넴
  const justPicked = Boolean(
    (location.state as { justPicked?: boolean } | null)?.justPicked,
  );
  const [intro, setIntro] = useState(justPicked);

  const [stage, setStage] = useState<TalkStage>("idle");
  // 음성 인식이 붙기 전까지는 목데이터를 순서대로 돌려 씀
  const [quizIndex, setQuizIndex] = useState(0);
  // 음성 인식이 없어 따라 말하기 결과를 번갈아 보여 줌
  const [repeatCount, setRepeatCount] = useState(0);
  const [coupons, setCoupons] = useState(child.coupons);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [songModalOpen, setSongModalOpen] = useState(false);
  // 몇 번째로 말해 봤는지. 목 인식 결과를 돌려 쓰는 데 씀
  const [attempt, setAttempt] = useState(0);
  // 들은 말이 비어 있으면 생각 중을 거쳐 다시 말해줄래로
  const [heardNothing, setHeardNothing] = useState(false);
  const quiz = MOCK_CONFIRM_QUIZZES[quizIndex];

  // 음성 수집 동의 여부 (설정에서 철회하면 false)
  const [hasVoiceConsent, setHasVoiceConsent] = useState(getVoiceConsent());
  // 에러 상태 (테스트: /home?error=connection, /home?error=micPermission)
  const [errorType, setErrorType] = useState<ChildErrorType | null>(() =>
    getDebugError(),
  );

  // 생각이 끝나면 되묻기로 넘어감
  useEffect(() => {
    if (stage !== "thinking") return;
    // 아무 말도 못 들었으면 생각 중을 거친 뒤 다시 말해줄래로
    const timer = window.setTimeout(
      () => setStage(heardNothing ? "sayAgain" : "confirm"),
      THINKING_MS,
    );
    return () => window.clearTimeout(timer);
  }, [stage, heardNothing]);

  // 첫인사가 끝나면 평소 모습으로 돌아감
  useEffect(() => {
    if (!intro) return;
    const timer = window.setTimeout(() => setIntro(false), INTRO_MS);
    return () => window.clearTimeout(timer);
  }, [intro]);

  // 말을 걸기 시작하면 첫인사는 바로 끝냄
  useEffect(() => {
    if (stage !== "idle") setIntro(false);
  }, [stage]);

  // 대화 중 인터넷이 끊기면 연결 끊김 화면
  useEffect(() => {
    const handleOffline = () => setErrorType("connection");
    window.addEventListener("offline", handleOffline);
    return () => window.removeEventListener("offline", handleOffline);
  }, []);

  /**
   * 녹음이 끝났을 때. 스스로 멈췄든 버튼으로 멈췄든 같은 길을 탄다.
   *   너무 짧다      -> 말한 것으로 치지 않고 바로 다시 말해줄래
   *   들은 말이 없다 -> 생각 중을 거친 뒤 다시 말해줄래
   *   글자가 나왔다  -> 생각 중을 거친 뒤 되묻기
   */
  const handleRecordingStop = (durationMs: number) => {
    if (durationMs < MIN_RECORD_MS) {
      setStage("sayAgain");
      return;
    }

    setHeardNothing(mockRecognize(attempt) === "");
    setStage("thinking");
  };

  const {
    start: startRecording,
    stop: stopRecording,
    cancel: cancelRecording,
  } = useVoiceRecording({ onStop: handleRecordingStop });

  // 듣는 중이 아니게 되거나 에러 화면이 뜨면 녹음을 접음.
  // 그냥 두면 타이머가 살아남아 엉뚱한 때에 다음 화면으로 넘어감
  useEffect(() => {
    if (stage !== "listening" || errorType) cancelRecording();
  }, [stage, errorType, cancelRecording]);

  const startListening = () => {
    setQuizIndex((index) => (index + 1) % MOCK_CONFIRM_QUIZZES.length);
    setAttempt((count) => count + 1);
    setHeardNothing(false);
    setStage("listening");
    startRecording();
  };

  // 수업을 마치면 쿠폰이 한 장 쌓이고 카드 획득 화면으로
  const finishLesson = () => {
    const next = Math.min(coupons + 1, COUPON_GOAL);
    setCoupons(next);
    setStage("card");
    // 마지막 한 장을 채우면 노래 완성 카드가 뜸
    if (next >= COUPON_GOAL) setSongModalOpen(true);
  };

  // 연결과 마이크를 확인한 뒤 듣기 시작
  // (iOS는 버튼 클릭 안에서만 마이크 권한 팝업이 떠서 클릭 핸들러에서 호출)
  const tryStartListening = async () => {
    if (!isOnline()) {
      setErrorType("connection");
      return;
    }
    const permission = await requestMicPermission();
    if (permission !== "granted") {
      setErrorType("micPermission");
      return;
    }
    setErrorType(null);
    startListening();
  };

  const handleMicClick = () => {
    // 듣는 중에 다시 누르면 그 자리에서 녹음을 멈춤.
    // 멈추는 방식과 상관없이 인식 과정은 똑같이 거친다
    if (stage === "listening") stopRecording();
    else tryStartListening();
  };

  const handleAgreeAgain = () => {
    setVoiceConsent(true);
    setHasVoiceConsent(true);
    setStage("idle"); // 처음 기다리는 화면부터 시작
  };

  // 에러 화면 버튼
  const handleRetry = async () => {
    if (!isOnline()) {
      setErrorType("connection");
      return;
    }
    const permission = await requestMicPermission();
    if (permission !== "granted") {
      setErrorType("micPermission");
      return;
    }
    setErrorType(null);
    setQuizIndex((index) => (index + 1) % MOCK_CONFIRM_QUIZZES.length);
    setStage("listening"); // 2-2 "응, 응, 듣고 있어!"
  };

  const handleGoHome = () => {
    setErrorType(null);
    setStage("idle");
  };

  const handleAskGuardian = () => navigate("/guardian/password");

  const renderMain = () => {
    // 1순위: 보호자가 음성 동의를 끈 상태
    if (!hasVoiceConsent) {
      return <VoiceConsentOff onAgreeAgain={handleAgreeAgain} />;
    }

    // 2순위: 에러 상태
    if (errorType === "connection") {
      return <ConnectionLost onRetry={handleRetry} onGoHome={handleGoHome} />;
    }

    if (errorType === "micPermission") {
      return (
        <MicPermissionOff
          onRetry={handleRetry}
          onAskGuardian={handleAskGuardian}
        />
      );
    }

    if (stage === "confirm") {
      return (
        <ConfirmQuestion
          quiz={quiz}
          onConfirm={() => setStage("meaning")}
          onDeny={() => setStage("place")}
          onRetry={tryStartListening}
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
          onNext={finishLesson}
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
          onNext={finishLesson}
        />
      );
    }

    if (stage === "card") {
      return (
        <CardEarned
          word={MOCK_EARNED_CARD.word}
          description={MOCK_EARNED_CARD.description}
          coupons={coupons}
          onAskAnother={tryStartListening}
          onOpenNotebook={() => alert("단어 수첩은 준비 중이에요")}
        />
      );
    }

    if (stage === "askLater") {
      return (
        <AskLater
          onConfirm={() => setStage("idle")}
          onAskAnother={tryStartListening}
        />
      );
    }

    if (stage === "sayAgain") {
      return (
        <SayAgain onRetry={tryStartListening} />
      );
    }

    return (
      <MoyaStageView
        stage={stage as MoyaStage}
        greeting={intro ? MOYA_LOOK_INFO[look].greeting : child.greeting}
        mood={intro ? MOYA_LOOK_INFO[look].mood : undefined}
        onMicClick={handleMicClick}
      />
    );
  };

  return (
    <main className="relative flex h-full flex-col overflow-hidden bg-cream pt-[62px] pb-[113px]">
      <ChildHeader
        childName={child.name}
        coupons={coupons}
        onCouponClick={() => setSheetOpen(true)}
        onGuardianClick={() => navigate("/guardian/password")}
      />

      {renderMain()}

      <Footer />

      {songModalOpen && (
        <SongCompleteModal
          words={MOCK_SONG_WORDS}
          onPlay={() => alert("단어 노래는 준비 중이에요")}
          onClose={() => setSongModalOpen(false)}
        />
      )}

      {sheetOpen && (
        <CouponSheet
          coupons={coupons}
          onStart={() => {
            setSheetOpen(false);
            tryStartListening();
          }}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </main>
  );
}
