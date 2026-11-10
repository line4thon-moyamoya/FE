import type { SongWord } from "../../api/song";
import { getWordIcon } from "../../constants/wordIcons";
import NoteIcon from "../common/NoteIcon/NoteIcon";

interface SongNowPlayingProps {
  word: SongWord;
  isPlaying: boolean;
}

export default function SongNowPlaying({
  word,
  isPlaying,
}: SongNowPlayingProps) {
  const image = word.imageUrl ?? getWordIcon(word.word);

  // 노래가 멈추면 음표도 그 자리에서 멈춤
  const noteMotion = `animate-note-sway ${
    isPlaying ? "" : "[animation-play-state:paused]"
  }`;

  return (
    <section className="flex flex-col items-center" aria-live="polite">
      <div className="relative flex w-[200px] h-[140px] items-center justify-center">
        {image && (
          <img src={image} className="h-[110px] w-[110px] object-contain" />
        )}
        <NoteIcon
          size={48}
          className={`absolute -left-5 bottom-2 text-[#FFC83D] ${noteMotion}`}
        />
        <NoteIcon
          size={24}
          className={`absolute right-2 top-0 text-brand-action ${noteMotion} [animation-direction:alternate-reverse]`}
        />
        <NoteIcon
          size={16}
          className={`absolute right-0 top-10 text-[#FF8FB8] ${noteMotion}`}
        />
      </div>

      <p className="mt-3 font-jua text-4xl leading-[48px] text-[#241F48]">
        {word.word}
      </p>
      <p className="mt-2 font-jua text-xl leading-7 text-brand-action">
        {word.word}, {word.word}, 그게 뭐야?
      </p>
      <p className="mt-1 font-noto text-sm font-bold leading-5 text-[#9E98BF]">
        {word.songDescription}
      </p>
    </section>
  );
}
