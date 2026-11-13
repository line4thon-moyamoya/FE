import book from "../../assets/icons/places/book.svg";
import parent from "../../assets/icons/places/parent.svg";
import school from "../../assets/icons/places/school.svg";
import tv from "../../assets/icons/places/tv.svg";
import type { HeardPlace } from "../../types/child";

const PLACE_ICON: Record<HeardPlace["id"], string> = {
  tv,
  parents: parent,
  book,
  kindergarten: school,
};

interface PlaceTileProps {
  place: HeardPlace;
  onClick?: () => void;
}

export default function PlaceTile({ place, onClick }: PlaceTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-full min-h-28 w-full min-w-0 cursor-pointer flex-col items-center justify-center gap-2
        rounded-[22px] bg-white shadow-place-tile transition-transform duration-100 active:scale-[0.97]"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-lavender">
        <img src={PLACE_ICON[place.id]} alt="" className="h-7 w-7" />
      </span>

      <span className="font-jua text-[15px] leading-[1.3] font-normal text-ink">
        {place.label}
      </span>
    </button>
  );
}
