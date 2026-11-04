import { useCallback, useEffect, useState } from "react";
import type { Song } from "../types/song";

const TICK_MS = 250;

export default function useSongPlayer(song: Song | undefined) {
  const duration = song?.durationSec ?? 0;
  const [currentSec, setCurrentSec] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // 재생 중이면 시간 흘려보내기
  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setCurrentSec((sec) => Math.min(sec + TICK_MS / 1000, duration));
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [isPlaying, duration]);

  // 끝까지 가면 멈춤
  useEffect(() => {
    if (duration > 0 && currentSec >= duration) setIsPlaying(false);
  }, [currentSec, duration]);

  const play = useCallback(() => {
    // 끝난 상태에서 누르면 처음부터
    setCurrentSec((sec) => (sec >= duration ? 0 : sec));
    setIsPlaying(true);
  }, [duration]);

  const pause = useCallback(() => setIsPlaying(false), []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const restart = useCallback(() => {
    setCurrentSec(0);
    setIsPlaying(true);
  }, []);

  const seekTo = useCallback(
    (sec: number) => setCurrentSec(Math.min(Math.max(sec, 0), duration)),
    [duration],
  );

  // 지금 부르는 구간 (startSec이 현재 시간 이하인 마지막 구간)
  const verses = song?.verses ?? [];
  const currentVerseIndex = Math.max(
    0,
    verses.findLastIndex((v) => v.startSec <= currentSec),
  );

  return {
    currentSec,
    duration,
    isPlaying,
    progress: duration > 0 ? currentSec / duration : 0, // 0 ~ 1
    currentVerseIndex,
    play,
    pause,
    togglePlay,
    restart,
    seekTo,
  };
}