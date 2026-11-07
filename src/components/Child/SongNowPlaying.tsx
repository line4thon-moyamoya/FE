import type { SongWord } from "../../api/song";
import { getWordIcon } from "../../constants/wordIcons";
import NoteIcon from "../common/NoteIcon/NoteIcon";

interface SongNowPlayingProps {
  word: SongWord;
}

export default function SongNowPlaying({ word }: SongNowPlayingProps) {
  // 서버 그림이 없으면 단어 이름으로 로컬 아이콘을 찾는다
  const image = word.imageUrl ?? getWordIcon(word.word);

  return (
    <section className="flex flex-col items-center" aria-live="polite">
      <div className="relative flex w-[200px] h-[140px] items-center justify-center">
        {image && <img src={image} className="h-[110px] w-[110px] object-contain" />}
        <NoteIcon size={48} className="absolute -left-5 bottom-2 text-[#FFC83D]" />
        <NoteIcon size={24} className="absolute right-2 top-0 text-brand-action" />
        <NoteIcon size={16} className="absolute right-0 top-10 text-[#FF8FB8]" />
      </div>

      <p className="mt-3 font-jua text-4xl leading-[48px] text-[#241F48]">
        {word.word}
      </p>
      <p className="mt-2 font-jua text-xl leading-7 text-brand-action">
        {word.songDescription}
      </p>
    </section>
  );
}
