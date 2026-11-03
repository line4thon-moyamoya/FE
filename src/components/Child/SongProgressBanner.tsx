import bell from "../../assets/icons/bell_icon.svg";
import right from "../../assets/icons/right_icon.svg";

interface SongProgressBannerProps {
  remaining: number;
  onClick: () => void;
}

export default function SongProgressBanner({
  remaining,
  onClick,
}: SongProgressBannerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[354px] h-[54px] cursor-pointer flex items-center gap-2.5 rounded-full bg-white pl-2.5 pr-[14px] py-2.5"
    >
      <img src={bell} className="w-5 h-5" />
      <span className="w-[258px] font-jua text-base font-normal leading-5 text-[#241F48] text-left">
        단어 {remaining}개 더 모으면 노래가 생겨!
      </span>
      <img src={right} className="w-[18px] h-[18px]" />
    </button>
  );
}
