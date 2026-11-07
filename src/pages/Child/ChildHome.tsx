import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AskLater from "../../components/Child/AskLater";
import CandidatePick from "../../components/Child/CandidatePick";
import CardEarned from "../../components/Child/CardEarned";
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
import {
  analyzeQuestion,
  clarifyQuestion,
  confirmWord,
  saveWordRequest,
  type AnalyzeResult,
  type ConfirmResult,
  type Voice,
  type HeardContext,
} from "../../api/question";
import { sendRepetition, type RepetitionResult } from "../../api/word";
import { getSongDetail, type SongDetail } from "../../api/song";
import { playVoice, stopAudio } from "../../utils/playAudio";
import type { ChildErrorType, MoyaStage, TalkStage } from "../../types/child";
import { MOYA_LOOK_INFO } from "../../constants/moyaLook";
import { useChildMode } from "../../contexts/ChildModeContext";
import { getVoiceConsent, setVoiceConsent } from "../../utils/voiceConsent";
import { requestMicPermission } from "../../utils/micPermission";
import { isOnline } from "../../utils/network";
import { getDebugError } from "../../utils/debugError";

/** 평소 홈에서 모야가 건네는 말 */
const GREETING = "안녕! 나는 모야야.\n궁금한 말 물어봐!";

/** 모야를 막 고르고 들어왔을 때 첫인사를 건네는 시간 */
const INTRO_MS = 1500;

export default function ChildHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const { child, coupons, setCoupons, childPath } = useChildMode();
  const look = child.look;

  // 모야를 막 고르고 들어왔으면 그 모야다운 첫인사를 먼저 건넴
  const navState = location.state as {
    justPicked?: boolean;
    startListening?: boolean;
  } | null;
  const justPicked = Boolean(navState?.justPicked);
  const [intro, setIntro] = useState(justPicked);

  const [stage, setStage] = useState<TalkStage>("idle");
  const [songModalOpen, setSongModalOpen] = useState(false);

  /** 질문 세션. 녹음을 보내면 채워진다 */
  const [session, setSession] = useState<AnalyzeResult | null>(null);
  /** 아이가 고른 뒤 확정된 단어 */
  const [word, setWord] = useState<ConfirmResult | null>(null);
  /** 따라 말하기 결과 */
  const [repetition, setRepetition] = useState<RepetitionResult | null>(null);
  /** 다섯 장을 채우면 만들어지는 노래 */
  const [song, setSong] = useState<SongDetail | null>(null);

  // 음성 수집 동의 여부 (설정에서 철회하면 false)
  const [hasVoiceConsent, setHasVoiceConsent] = useState(getVoiceConsent());
  // 에러 상태 (테스트: /home?error=connection, /home?error=micPermission)
  const [errorType, setErrorType] = useState<ChildErrorType | null>(() =>
    getDebugError(),
  );

  // 다른 화면의 쿠폰 시트에서 "지금 물어볼래" 를 누르고 넘어온 경우
  useEffect(() => {
    if (!navState?.startListening) return;
    // 같은 자리에 머무르되 표시만 지워 뒤로 가기나 새로고침에 다시 걸리지 않게 함
    navigate(".", { replace: true, state: null });
    void tryStartListening();
    // 들어올 때 한 번만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // 노래가 만들어질 때까지 1초마다 다시 물어본다
  useEffect(() => {
    const songId = repetition?.song?.songId;
    if (!songId || song?.status === "READY" || song?.status === "FAILED") return;

    const timer = window.setInterval(async () => {
      try {
        const detail = await getSongDetail(child.childId, songId);
        setSong(detail);
      } catch {
        // 한 번 실패해도 다음 차례에 다시 물어본다
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [repetition, song, child.childId]);

  // 대화 중 인터넷이 끊기면 연결 끊김 화면
  useEffect(() => {
    const handleOffline = () => setErrorType("connection");
    window.addEventListener("offline", handleOffline);
    return () => window.removeEventListener("offline", handleOffline);
  }, []);

  /** 확정된 단어를 한 글자씩 나눠 글자 칸에 올림 */
  const letters = (word?.word ?? "").split("");

  /**
   * 서버 오류를 화면으로 옮긴다.
   *   음성을 못 알아들음 -> 다시 말해줄래
   *   세션 만료         -> 처음부터
   *   그 밖의 통신 오류  -> 연결 끊김
   */
  const handleApiError = (error: unknown) => {
    const status = (error as { response?: { status?: number } })?.response
      ?.status;

    if (status === 422) {
      setStage("sayAgain");
      return;
    }
    if (status === 404) {
      setSession(null);
      setStage("idle");
      return;
    }
    setErrorType("connection");
  };

  /** 서버가 준 대사를 소리로 들려준다 */
  const speakDialogue = (dialogue: Voice) => playVoice(dialogue);

  /**
   * 녹음이 끝났을 때. 스스로 멈췄든 버튼으로 멈췄든 같은 길을 탄다.
   *   너무 짧다     -> 서버로 보내지 않고 바로 다시 말해줄래
   *   후보를 찾았다 -> 되묻기
   *   못 찾았다     -> 어디서 들었어
   */
  const handleRecordingStop = async ({
    durationMs,
    audio,
  }: {
    durationMs: number;
    audio: Blob | null;
  }) => {
    // 따라 말하기 중이면 다른 곳으로 보낸다
    if (stage === "repeat") {
      if (audio && word) await sendRepetitionAudio(audio);
      return;
    }

    if (durationMs < MIN_RECORD_MS || !audio) {
      setStage("sayAgain");
      return;
    }

    setStage("thinking");

    try {
      const result = await analyzeQuestion(child.childId, audio);
      setSession(result);

      if (result.status === "NO_CANDIDATE") {
        setStage("place");
        return;
      }

      if (result.dialogue) speakDialogue(result.dialogue);
      setStage("confirm");
    } catch (error) {
      handleApiError(error);
    }
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
    stopAudio();
    setSession(null);
    setWord(null);
    setRepetition(null);
    setStage("listening");
    void startRecording();
  };

  /** 따라 말하기 결과 화면에서 카드 획득으로 */
  const finishLesson = () => {
    if (repetition?.acquisitionDialogue) {
      speakDialogue(repetition.acquisitionDialogue);
    }
    setStage("card");
    // 다섯 장을 채우면 노래 생성이 시작되고 완성 카드가 뜸
    if (repetition?.song) setSongModalOpen(true);
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

  /** 따라 말한 음성을 보내고 결과와 카드 획득을 받는다 */
  const sendRepetitionAudio = async (audio: Blob) => {
    if (!word) return;

    try {
      const result = await sendRepetition(child.childId, word.wordId, audio);
      setRepetition(result);
      setCoupons(result.couponCount);
      speakDialogue(result.repetitionDialogue);
      setStage(result.isCorrect ? "repeatSuccess" : "repeatRetry");
    } catch (error) {
      handleApiError(error);
    }
  };

  /** 아이가 고른 후보를 확정하고 뜻 알려주기로 */
  const handleConfirm = async (candidateId: string) => {
    if (!session) return;

    try {
      const result = await confirmWord(session.sessionId, candidateId);
      setWord(result);
      if (result.descriptionAudioUrl) {
        playVoice({ audioUrl: result.descriptionAudioUrl });
      }
      setStage("meaning");
    } catch (error) {
      handleApiError(error);
    }
  };

  /** 들은 곳을 알려 주고 2차 후보를 찾는다 */
  const handleClarify = async (context: HeardContext) => {
    if (!session) return;
    setStage("thinking");

    try {
      const result = await clarifyQuestion(session.sessionId, context);
      setSession({ ...result, dialogue: result.dialogue ?? session.dialogue });

      // 2차에서도 못 찾으면 바로 물어볼 단어로 남긴다
      if (result.status === "NO_CANDIDATE") {
        await handleWordRequest(result.sessionId);
        return;
      }
      setStage("candidates");
    } catch (error) {
      handleApiError(error);
    }
  };

  /** 끝내 찾지 못한 말을 보호자에게 물어볼 단어로 남긴다 */
  const handleWordRequest = async (sessionId?: string) => {
    const id = sessionId ?? session?.sessionId;
    if (!id) return;

    try {
      await saveWordRequest(id);
      setStage("askLater");
    } catch (error) {
      handleApiError(error);
    }
  };

  /** 따라 말하기 녹음 시작. 끝나면 handleRecordingStop 이 단계를 보고 갈라 준다 */
  const startRepetition = () => {
    if (word) void startRecording();
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
    startListening();
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

    if (stage === "confirm" && session) {
      return (
        <ConfirmQuestion
          candidates={session.candidates}
          line={session.dialogue?.text ?? ""}
          onConfirm={handleConfirm}
          onDeny={() => setStage("place")}
          onRetry={tryStartListening}
          onReplay={() =>
            session.dialogue && speakDialogue(session.dialogue)
          }
        />
      );
    }

    if (stage === "place") {
      return (
        <HeardPlacePick
          onPick={handleClarify}
          onSkip={() => handleClarify("UNKNOWN")}
        />
      );
    }

    if (stage === "candidates") {
      return (
        <CandidatePick
          candidates={session?.candidates ?? []}
          onPick={handleConfirm}
          onDeny={handleWordRequest}
        />
      );
    }

    if (stage === "meaning") {
      return (
        <WordLesson
          letters={letters}
          line={word?.description ?? ""}
          mood="explain"
          buttonLabel="알았어!"
          bubbleWidth={340}
          onNext={() => setStage("repeat")}
          onReplay={() =>
            word?.descriptionAudioUrl && playVoice({ audioUrl: word.descriptionAudioUrl })
          }
        />
      );
    }

    if (stage === "repeat") {
      return (
        <RepeatAfter
          letters={letters}
          word={word?.word ?? ""}
          onSpeak={startRepetition}
        />
      );
    }

    if (stage === "repeatSuccess") {
      return (
        <WordLesson
          letters={letters}
          line={repetition?.repetitionDialogue.text ?? ""}
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
          letters={letters}
          line={repetition?.repetitionDialogue.text ?? ""}
          mood="explain"
          buttonLabel="알았어!"
          onNext={finishLesson}
        />
      );
    }

    if (stage === "card") {
      return (
        <CardEarned
          word={word?.word ?? ""}
          description={word?.description ?? ""}
          coupons={coupons}
          onAskAnother={tryStartListening}
          onOpenNotebook={() => navigate(childPath("notebook"))}
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
        greeting={intro ? MOYA_LOOK_INFO[look].greeting : GREETING}
        mood={intro ? MOYA_LOOK_INFO[look].mood : undefined}
        onMicClick={handleMicClick}
      />
    );
  };

  return (
    <>
      {renderMain()}

      {/* 노래가 다 만들어지면 완성 카드를 띄운다 */}
      {songModalOpen && song?.status === "READY" && (
        <SongCompleteModal
          words={song.words.map((w) => w.word)}
          onPlay={() => navigate(childPath(`song/${song.songId}`))}
          onClose={() => setSongModalOpen(false)}
        />
      )}

    </>
  );
}
