import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ChildHeader from "../../components/common/ChildHeader/ChildHeader";
import Footer from "../../components/common/Footer/Footer";
import BackButton from "../../components/common/BackButton/BackButton";
import SongNowPlaying from "../../components/Child/SongNowPlaying";
import SongProgress from "../../components/Child/SongProgress";
import SongWordChips from "../../components/Child/SongWordChips";
import useSongPlayer from "../../hooks/useSongPlayer";
import { findChildProfile } from "../../mocks/child";
import { findSong } from "../../mocks/songs";
import { findWord } from "../../mocks/words";
import { getCurrentChildId } from "../../utils/currentChild";
import pauseIcon from "../../assets/icons/pause.svg";
import playIcon from "../../assets/icons/play.svg";
import replayIcon from "../../assets/icons/replay.svg";

export default function SongPlayer() {
  const navigate = useNavigate();
  const { songId } = useParams();
  const child = findChildProfile(getCurrentChildId());
  const song = songId ? findSong(child.id, songId) : undefined;

  // 훅은 return보다 먼저 불러야 해서 song이 없어도 호출
  const player = useSongPlayer(song);
  const { play, pause } = player;

  // 들어오면 바로 재생, 나가면 멈춤
  useEffect(() => {
    if (!song) return;
    play();
    return () => pause();
  }, [song, play, pause]);

  // 없는 노래면 단어 노래로
  if (!song) return <Navigate to="/song" replace />;

  const verse = song.verses[player.currentVerseIndex];
  const word = verse ? findWord(verse.wordId) : undefined;
  const wordNames = song.verses.map((v) => findWord(v.wordId)?.word ?? "");

  // 지금 단어 구간 기준 시간 (단어마다 0:00부터 보이도록)
  const verseStart = verse?.startSec ?? 0;
  const nextVerse = song.verses[player.currentVerseIndex + 1];
  const verseEnd = nextVerse ? nextVerse.startSec : player.duration;
  const verseDuration = verseEnd - verseStart;
  const verseCurrent = Math.min(
    Math.max(player.currentSec - verseStart, 0),
    verseDuration,
  );
  const verseProgress = verseDuration > 0 ? verseCurrent / verseDuration : 0;

  // 고른 단어 구간의 처음부터 재생
  const playVerseFromStart = (index: number) => {
    const target = song.verses[index];
    if (!target) return;
    player.seekTo(target.startSec);
    player.play();
  };

  // 지금 부르는 단어를 처음부터 다시 (노래가 끝났으면 마지막 단어를 다시)
  const handleReplayCurrent = () => {
    playVerseFromStart(player.currentVerseIndex);
  };

  return (
    <main className="flex h-full flex-col bg-cream pt-[62px] pb-[113px]">
      <ChildHeader
        childName={child.name}
        coupons={child.coupons}
        onCouponClick={() => alert("노래 쿠폰은 준비 중이에요")}
        onGuardianClick={() => navigate("/guardian/password")}
      />

      <header className="flex items-center gap-2.5 pl-6 pt-4">
        <BackButton />
        <h1 className="font-jua text-xl leading-7 text-[#241F48]">
          {song.title}
        </h1>
      </header>

      <div className="flex flex-1 flex-col items-center gap-8 overflow-y-auto px-6 pt-8 pb-6">
        {word && verse && (
          <SongNowPlaying
            word={word}
            lyric={verse.lyric}
            caption={verse.caption}
          />
        )}

        <div className="flex w-full flex-col gap-4">
          <SongProgress
            progress={verseProgress}
            currentSec={verseCurrent}
            duration={verseDuration}
          />
          <SongWordChips
            words={wordNames}
            currentIndex={player.currentVerseIndex}
            onSelect={playVerseFromStart}
          />
        </div>

        {/* 재생 컨트롤 */}
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={handleReplayCurrent}
            aria-label="지금 단어 처음부터 다시 듣기"
            className="cursor-pointer flex w-13 h-13 items-center justify-center rounded-full bg-white border-2 border-[#E3DDFB]"
          >
            <img src={replayIcon} alt="" className="w-[22px] h-[22px]" />
          </button>
          <button
            type="button"
            onClick={player.togglePlay}
            aria-label={player.isPlaying ? "일시정지" : "재생"}
            className="cursor-pointer flex w-18 h-18 items-center justify-center rounded-full bg-[#6A4FF3] shadow-[0px_8px_20px_0px_rgba(106,79,243,0.35)]"
          >
            <img
              src={player.isPlaying ? pauseIcon : playIcon}
              alt=""
              className="w-7 h-7"
            />
          </button>
          <div className="w-13 h-13" aria-hidden="true" />
        </div>
      </div>

      <Footer />
    </main>
  );
}