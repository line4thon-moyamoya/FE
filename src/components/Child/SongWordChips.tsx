interface SongWordChipsProps {
  words: string[]; // 구간 순서대로 단어 이름
  currentIndex: number; // 지금 부르는 구간
  onSelect: (index: number) => void;
}

export default function SongWordChips({
  words,
  currentIndex,
  onSelect,
}: SongWordChipsProps) {
  return (
    <ul className="flex flex-wrap justify-center gap-[6px] ">
      {words.map((word, index) => {
        const isCurrent = index === currentIndex;
        return (
          <li key={`${word}-${index}`}>
            <button
              type="button"
              onClick={() => onSelect(index)}
              aria-current={isCurrent ? "true" : undefined}
              className={`cursor-pointer rounded-full px-3 py-1.5 font-jua text-base font-normal ${
                isCurrent
                  ? "bg-[#6A4FF3] text-white"
                  : "bg-[#EEEAFF] text-[#6A4FF3]"
              }`}
            >
              {word}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
