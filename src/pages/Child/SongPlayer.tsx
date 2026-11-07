import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import BackButton from "../../components/common/BackButton/BackButton";
import SongNowPlaying from "../../components/Child/SongNowPlaying";
import SongProgress from "../../components/Child/SongProgress";
import SongWordChips from "../../components/Child/SongWordChips";
import useSongPlayer from "../../hooks/useSongPlayer";
import pauseIcon from "../../assets/icons/pause.svg";
import playIcon from "../../assets/icons/play.svg";
import replayIcon from "../../assets/icons/replay.svg";
import { getSongDetail, type SongDetail } from "../../api/song";
import { useChildMode } from "../../contexts/ChildModeContext";

export default function SongPlayer() {
  const { songId } = useParams();
  const { child, childPath } = useChildMode();
  const id = Number(songId);

  const [song, setSong] = useState<SongDetail | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!Number.isInteger(id)) return;

    let alive = true;
    getSongDetail(child.childId, id)
      .then((data) => alive && setSong(data))
      .catch(() => alive && setFailed(true));

    return () => {
      alive = false;
    };
  }, [child.childId, id]);

  const player = useSongPlayer(song);
  const { play, pause } = player;

  // 음원이 준비되면 바로 재생, 나가면 멈춤
  useEffect(() => {
    if (song?.status !== "READY") return;
    play();
    return () => pause();
  }, [song, play, pause]);

  if (!Number.isInteger(id) || failed) {
    return <Navigate to={childPath("song")} replace />;
  }

  const words = song?.words ?? [];
  const current = words[player.currentWordIndex];

  // 지금 단어 구간 기준 시간 (단어마다 0:00 부터 보이도록)
  const start = current?.startSec ?? 0;
  const next = words[player.currentWordIndex + 1];
  const end = next ? next.startSec : player.duration;
  const spanDuration = Math.max(end - start, 0);
  const spanCurrent = Math.min(
    Math.max(player.currentSec - start, 0),
    spanDuration,
  );

  /** 고른 단어 구간의 처음부터 재생 */
  const playFromWord = (index: number) => {
    const target = words[index];
    if (!target) return;
    player.seekTo(target.startSec);
    player.play();
  };

  return (
    <>
      <header className="flex items-center gap-2.5 pt-4 pl-6">
        <BackButton />
        <h1 className="font-jua text-xl leading-7 text-ink">
          {song?.title ?? ""}
        </h1>
      </header>

      <div className="flex flex-1 flex-col items-center gap-8 overflow-y-auto px-6 pt-8 pb-6">
        {song?.status === "GENERATING" && (
          <p className="mt-16 text-center font-jua text-xl leading-7 text-ink">
            노래를 만들고 있어.
            <br />
            조금만 기다려 줄래?
          </p>
        )}

        {song?.status === "FAILED" && (
          <p className="mt-16 text-center font-jua text-xl leading-7 text-ink">
            앗, 노래를 못 만들었어.
            <br />
            다음에 다시 해보자!
          </p>
        )}

        {song?.status === "READY" && (
          <>
            {current && <SongNowPlaying word={current} />}

            <div className="flex w-full flex-col gap-4">
              <SongProgress
                progress={spanDuration > 0 ? spanCurrent / spanDuration : 0}
                currentSec={spanCurrent}
                duration={spanDuration}
              />
              <SongWordChips
                words={words.map((w) => w.word)}
                currentIndex={player.currentWordIndex}
                onSelect={playFromWord}
              />
            </div>

            {/* 재생 컨트롤 */}
            <div className="flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => playFromWord(player.currentWordIndex)}
                aria-label="지금 단어 처음부터 다시 듣기"
                className="flex h-13 w-13 cursor-pointer items-center justify-center
                  rounded-full border-2 border-line-lavender bg-white"
              >
                <img src={replayIcon} alt="" className="h-[22px] w-[22px]" />
              </button>
              <button
                type="button"
                onClick={player.togglePlay}
                aria-label={player.isPlaying ? "일시정지" : "재생"}
                className="flex h-18 w-18 cursor-pointer items-center justify-center rounded-full
                  bg-brand-action shadow-[0px_8px_20px_0px_rgba(106,79,243,0.35)]"
              >
                <img
                  src={player.isPlaying ? pauseIcon : playIcon}
                  alt=""
                  className="h-7 w-7"
                />
              </button>
              <div className="h-13 w-13" aria-hidden />
            </div>
          </>
        )}
      </div>
    </>
  );
}
