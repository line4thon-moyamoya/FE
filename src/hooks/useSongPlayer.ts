import { useCallback, useEffect, useRef, useState } from "react";

import type { SongDetail } from "../api/song";

/**
 * 서버가 준 음원을 재생한다.
 * 진행 상태는 오디오가 알려 주는 실제 시간을 따른다.
 */
export default function useSongPlayer(song: SongDetail | null) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSec, setCurrentSec] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioUrl = song?.audioUrl ?? null;

  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const syncTime = () => setCurrentSec(audio.currentTime);
    const syncDuration = () =>
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const handleEnd = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", syncTime);
    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", syncTime);
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("ended", handleEnd);
      audioRef.current = null;
      setCurrentSec(0);
      setDuration(0);
      setIsPlaying(false);
    };
  }, [audioUrl]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 끝난 상태에서 누르면 처음부터
    if (audio.duration && audio.currentTime >= audio.duration) {
      audio.currentTime = 0;
    }
    void audio.play().catch(() => {});
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const restart = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => {});
    setIsPlaying(true);
  }, []);

  const seekTo = useCallback((sec: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(sec, 0), audio.duration || 0);
    setCurrentSec(audio.currentTime);
  }, []);

  // 지금 부르는 구간 (startSec 이 현재 시간 이하인 마지막 구간)
  const words = song?.words ?? [];
  const currentWordIndex = Math.max(
    0,
    words.findLastIndex((w) => w.startSec <= currentSec),
  );

  // 재생 중에는 화면을 그릴 때마다 시간 갱신 (막대 바가 부드럽게 움직이도록)
useEffect(() => {
  if (!isPlaying) return;

  let frameId: number;
  const tick = () => {
    const audio = audioRef.current;
    if (audio) setCurrentSec(audio.currentTime);
    frameId = requestAnimationFrame(tick);
  };
  frameId = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(frameId);
}, [isPlaying]);

  return {
    currentSec,
    duration,
    isPlaying,
    progress: duration > 0 ? currentSec / duration : 0,
    currentWordIndex,
    play,
    pause,
    togglePlay,
    restart,
    seekTo,
  };
}
