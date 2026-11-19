import { useState } from "react";

import type { SongWord } from "../../api/song";
import { getWordIcon, getWordImage, WORD_DEFAULT_IMAGE } from "../../constants/wordIcons";
import NoteIcon from "../common/NoteIcon/NoteIcon";

interface SongNowPlayingProps {
  word: SongWord;
  isPlaying: boolean;
}

export default function SongNowPlaying({
  word,
  isPlaying,
}: SongNowPlayingProps) {
  // 서버 주소 → 내장 아이콘 → 기본 그림. 서버 주소가 깨지면 아이콘으로 바꿈
  const image = getWordImage(word.imageUrl, word.word);
  const fallback = getWordIcon(word.word) ?? WORD_DEFAULT_IMAGE;
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const src = image === failedSrc ? fallback : image;

  // 노래가 멈추면 음표도 그 자리에서 멈춤
  const noteMotion = `animate-note-sway ${
    isPlaying ? "" : "[animation-play-state:paused]"
  }`;

  return (
    <section className="flex flex-col items-center" aria-live="polite">
      <div className="relative flex h-[140px] w-[200px] items-center justify-center">
        <img
          src={src}
          alt={word.word}
          onError={() => setFailedSrc(image)}
          className="h-[110px] w-[110px] object-contain"
        />
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
      {word.description && (
        <p className="mt-1 font-noto text-sm font-bold leading-5 text-[#9E98BF]">
          {word.description}
        </p>
      )}
    </section>
  );
}