import { useCallback, useEffect, useRef, useState } from "react";

/** 말이 끝난 뒤 이만큼 조용하면 스스로 멈춤 */
export const SILENCE_MS = 1500;
/** 녹음은 길어도 여기까지 */
export const MAX_RECORD_MS = 10_000;
/** 이보다 짧으면 말한 것으로 치지 않음 */
export const MIN_RECORD_MS = 1000;

/**
 * 음성 인식이 붙기 전까지 아이가 말하는 시간을 흉내 내는 값.
 * 실제로는 소리를 들어야 조용해진 시점을 알 수 있으므로,
 * 지금은 "이만큼 말했다" 고 가정하고 그 뒤 SILENCE_MS 를 더해 멈춘다.
 */
const MOCK_SPEECH_MS = 2000;

interface UseVoiceRecordingOptions {
  /**
   * 녹음이 끝났을 때. 스스로 멈췄든 버튼으로 멈췄든 똑같이 불림.
   * durationMs 는 실제로 녹음한 시간.
   */
  onStop: (durationMs: number) => void;
}

export default function useVoiceRecording({ onStop }: UseVoiceRecordingOptions) {
  const [isRecording, setIsRecording] = useState(false);

  const startedAt = useRef(0);
  const timers = useRef<number[]>([]);
  // 최신 onStop 을 타이머가 바라보도록
  const onStopRef = useRef(onStop);
  onStopRef.current = onStop;

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  const stop = useCallback(() => {
    if (!startedAt.current) return;

    clearTimers();
    const durationMs = Date.now() - startedAt.current;
    startedAt.current = 0;
    setIsRecording(false);
    onStopRef.current(durationMs);
  }, [clearTimers]);

  const start = useCallback(() => {
    clearTimers();
    startedAt.current = Date.now();
    setIsRecording(true);

    timers.current.push(
      // 말이 끝나고 조용해지면 스스로 멈춤
      window.setTimeout(stop, MOCK_SPEECH_MS + SILENCE_MS),
      // 아무리 길어도 여기서는 멈춤
      window.setTimeout(stop, MAX_RECORD_MS),
    );
  }, [clearTimers, stop]);

  /** 녹음한 것을 버리고 끝냄 (화면을 벗어날 때) */
  const cancel = useCallback(() => {
    clearTimers();
    startedAt.current = 0;
    setIsRecording(false);
  }, [clearTimers]);

  useEffect(() => cancel, [cancel]);

  return { isRecording, start, stop, cancel };
}
