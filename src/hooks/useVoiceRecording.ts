import { useCallback, useEffect, useRef, useState } from "react";

/** 말이 끝난 뒤 이만큼 조용하면 스스로 멈춤 */
export const SILENCE_MS = 1500;
/** 녹음은 길어도 여기까지 */
export const MAX_RECORD_MS = 10_000;
/** 이보다 짧으면 말한 것으로 치지 않음 */
export const MIN_RECORD_MS = 1000;

/** 이 크기보다 작으면 조용한 것으로 봄 (0~1) */
const SILENCE_LEVEL = 0.02;
/** 소리 크기를 살피는 간격 */
const CHECK_MS = 100;

interface UseVoiceRecordingOptions {
  /**
   * 녹음이 끝났을 때. 스스로 멈췄든 버튼으로 멈췄든 똑같이 불림.
   * audio 가 null 이면 녹음된 소리가 없다는 뜻.
   */
  onStop: (result: { durationMs: number; audio: Blob | null }) => void;
  /** 마이크를 열지 못했을 때 */
  onError?: (error: unknown) => void;
}

export default function useVoiceRecording({
  onStop,
  onError,
}: UseVoiceRecordingOptions) {
  const [isRecording, setIsRecording] = useState(false);

  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const startedAt = useRef(0);
  const timers = useRef<number[]>([]);
  const audioContext = useRef<AudioContext | null>(null);
  /** 마지막으로 소리가 들린 시각 */
  const lastSoundAt = useRef(0);
  /** 버린 녹음은 onStop 을 부르지 않기 위한 표시 */
  const discarded = useRef(false);

  // 최신 콜백을 타이머가 바라보도록
  const onStopRef = useRef(onStop);
  onStopRef.current = onStop;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const cleanUp = useCallback(() => {
    timers.current.forEach(window.clearInterval);
    timers.current.forEach(window.clearTimeout);
    timers.current = [];

    recorder.current?.stream.getTracks().forEach((track) => track.stop());
    recorder.current = null;

    void audioContext.current?.close().catch(() => {});
    audioContext.current = null;
  }, []);

  /** 녹음을 멈춘다. 멈추는 방식과 상관없이 같은 길을 탄다 */
  const stop = useCallback(() => {
    if (recorder.current?.state === "recording") recorder.current.stop();
  }, []);

  /** 녹음한 것을 버리고 끝낸다 (화면을 벗어날 때) */
  const cancel = useCallback(() => {
    discarded.current = true;
    stop();
    cleanUp();
    setIsRecording(false);
  }, [cleanUp, stop]);

  const start = useCallback(async () => {
    cleanUp();
    discarded.current = false;
    chunks.current = [];

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      onErrorRef.current?.(error);
      return;
    }

    const media = new MediaRecorder(stream);
    recorder.current = media;
    startedAt.current = Date.now();
    lastSoundAt.current = Date.now();

    media.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.current.push(event.data);
    };

    media.onstop = () => {
      const durationMs = Date.now() - startedAt.current;
      const audio = chunks.current.length
        ? new Blob(chunks.current, { type: media.mimeType })
        : null;

      cleanUp();
      setIsRecording(false);
      if (!discarded.current) onStopRef.current({ durationMs, audio });
    };

    media.start();
    setIsRecording(true);

    // 소리 크기를 지켜보다가 조용해지면 스스로 멈춤
    const context = new AudioContext();
    audioContext.current = context;
    const analyser = context.createAnalyser();
    analyser.fftSize = 512;
    context.createMediaStreamSource(stream).connect(analyser);

    const samples = new Uint8Array(analyser.fftSize);

    timers.current.push(
      window.setInterval(() => {
        analyser.getByteTimeDomainData(samples);
        // 128 이 무음. 가장 크게 벗어난 값으로 소리 크기를 가늠
        let peak = 0;
        for (const value of samples) {
          peak = Math.max(peak, Math.abs(value - 128) / 128);
        }

        const now = Date.now();
        if (peak > SILENCE_LEVEL) lastSoundAt.current = now;
        else if (now - lastSoundAt.current >= SILENCE_MS) stop();
      }, CHECK_MS),
      // 아무리 길어도 여기서는 멈춤
      window.setTimeout(stop, MAX_RECORD_MS),
    );
  }, [cleanUp, stop]);

  useEffect(() => cancel, [cancel]);

  return { isRecording, start, stop, cancel };
}
