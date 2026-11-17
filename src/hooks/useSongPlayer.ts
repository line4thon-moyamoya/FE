import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { SongDetail, SongWord } from "../api/song";

/** 임시값: 서버가 startSec 을 주기 전까지 쓰는 전주/후주 길이(초) */
const INTRO_SEC = 9.5;
const OUTRO_SEC = 0;

/** 아직 길이를 모르면(NaN, Infinity) 0 */
const readDuration = (audio: HTMLAudioElement) =>
  Number.isFinite(audio.duration) ? audio.duration : 0;

/**
 * 단어마다 노래에서 시작하는 시점(초).
 * 서버가 startSec 을 모두 주면 그대로 쓰고,
 * 아니면 전주 뒤부터 후주 앞까지를 단어 수로 똑같이 나눈다.
 */
const getWordStarts = (words: SongWord[], duration: number) => {
  const fromServer = words.map((w) => Number(w.startSec));
  const serverReady =
    words.length > 0 &&
    words.every((w) => w.startSec !== null && w.startSec !== undefined) &&
    fromServer.every(Number.isFinite);

  if (serverReady) return fromServer;
  if (duration <= 0) return words.map(() => 0);

  const intro = Math.min(INTRO_SEC, duration);
  const singing = Math.max(duration - intro - OUTRO_SEC, 0);
  return words.map((_, i) => intro + (singing * i) / words.length);
};

/**
 * 서버가 준 음원을 재생한다.
 * 재생 상태·시간·길이는 모두 오디오가 알려 주는 실제 값을 따른다.
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
    audio.preload = "auto";
    audioRef.current = audio;

    const syncTime = () => setCurrentSec(audio.currentTime);
    const syncDuration = () => setDuration(readDuration(audio));
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnd = () => {
      setDuration(readDuration(audio));
      setCurrentSec(audio.currentTime);
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", syncTime);
    audio.addEventListener("seeked", syncTime);
    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("durationchange", syncDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("timeupdate", syncTime);
      audio.removeEventListener("seeked", syncTime);
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("durationchange", syncDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnd);
      audio.pause();
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
    if (audio.ended) audio.currentTime = 0;

    // 재생 상태는 play 이벤트로 바뀜. 자동재생이 막히면 멈춤 상태로 둔다
    audio.play().catch(() => setIsPlaying(false));
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play();
    else pause();
  }, [play, pause]);

  const seekTo = useCallback((sec: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(sec)) return;

    const max = readDuration(audio);
    const target = max > 0 ? Math.min(Math.max(sec, 0), max) : Math.max(sec, 0);
    audio.currentTime = target;
    setCurrentSec(target);
  }, []);

  /** 노래 맨 처음부터 다시 재생 (재생 중이든 멈춤이든) */
  const restart = useCallback(() => {
    seekTo(0);
    play();
  }, [seekTo, play]);

  const words = useMemo(() => song?.words ?? [], [song]);
  const wordStarts = useMemo(
    () => getWordStarts(words, duration),
    [words, duration],
  );

  /** 고른 단어 구간의 처음부터 재생 */
  const playFromWord = useCallback(
    (index: number) => {
      const start = wordStarts[index];
      if (start === undefined) return;
      seekTo(start);
      play();
    },
    [wordStarts, seekTo, play],
  );

  // 지금 부르는 구간 (시작 시점이 현재 시간 이하인 마지막 구간)
  const currentWordIndex = Math.max(
    0,
    wordStarts.findLastIndex((start) => start <= currentSec),
  );

  // 재생 중에는 매 프레임 시간 갱신 (막대가 부드럽게 움직이도록)
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
    progress: duration > 0 ? Math.min(currentSec / duration, 1) : 0,
    currentWordIndex,
    play,
    pause,
    togglePlay,
    seekTo,
    restart,
    playFromWord,
  };
}