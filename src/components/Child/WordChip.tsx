import NoteIcon from "../common/NoteIcon/NoteIcon";

interface WordChipProps {
  word: string;
}

export default function WordChip({ word }: WordChipProps) {
  return (
    <span
      className="flex items-center gap-1 rounded-full border-[1.5px] border-line bg-white
        py-1.5 pr-3 pl-2.5"
    >
      <span className="text-brand-action">
        <NoteIcon size={14} />
      </span>
      <span className="font-jua text-base font-normal text-ink">{word}</span>
    </span>
  );
}
