interface LetterTilesProps {
  /** 한 칸에 한 글자씩 */
  letters: string[];
}

export default function LetterTiles({ letters }: LetterTilesProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {letters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="flex h-[68px] w-[68px] items-center justify-center rounded-[18px]
            border-[2.5px] border-line-lavender bg-white font-jua text-4xl leading-[1.15]
            font-normal text-ink shadow-button-secondary"
        >
          {letter}
        </span>
      ))}
    </div>
  );
}
