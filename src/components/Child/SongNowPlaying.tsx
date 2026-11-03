import type { Word } from "../../types/word";
import noteYellow from "../../assets/icons/note_yellow.svg";
import notePurple from "../../assets/icons/note_purple.svg";
import notePink from "../../assets/icons/note_pink.svg";

interface SongNowPlayingProps {
  word: Word;
  lyric: string;
  caption: string;
}

export default function SongNowPlaying({
  word,
  lyric,
  caption,
}: SongNowPlayingProps) {
  return (
    <section className="flex flex-col items-center" aria-live="polite">
      <div className="relative flex w-[200px] h-[140px] items-center justify-center">
        <img src={word.image} className="w-[110px] h-[110px] object-contain" />
        <img src={noteYellow} className="absolute -left-5 bottom-2 w-12 h-12" />
        <img src={notePurple} className="absolute right-2 top-0 w-6 h-6" />
        <img src={notePink} className="absolute right-0 top-10 w-4 h-4" />
      </div>

      <p className="mt-3 font-jua text-4xl leading-[48px] text-[#241F48]">
        {word.word}
      </p>
      <p className="mt-2 font-jua text-xl leading-7 text-[#6A4FF3]">{lyric}</p>
      <p className="mt-1 font-noto text-sm font-bold leading-5 text-[#9E98BF]">
        {caption}
      </p>
    </section>
  );
}
