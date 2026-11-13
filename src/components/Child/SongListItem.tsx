import play from "../../assets/icons/play.svg";
import type { SongSummary } from "../../api/song";

interface SongListItemProps {
  song: SongSummary;
  onClick: () => void;
}

export default function SongListItem({ song, onClick }: SongListItemProps) {
  const wordNames = song.words.join(", ");

  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="cursor-pointer flex w-full h-20 items-center gap-[14px] py-[14px] pl-[14px] pr-4 rounded-[20px] bg-[#EEEAFF] text-left"
      >
        <span className="flex w-[52px] h-[52px] items-center justify-center rounded-full bg-[#6A4FF3]">
          <img src={play} className="w-6 h-6" />
        </span>
        <span className="flex min-w-0 flex-col gap-1">
          <span className="font-jua text-lg font-normal text-[#241F48]">
            {song.title}
          </span>
          <span className="font-noto text-xs font-bold text-[#6A4FF3]">
            {wordNames}
          </span>
        </span>
      </button>
    </li>
  );
}
