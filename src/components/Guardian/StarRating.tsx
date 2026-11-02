import type { StarCount } from "../../types/guardian";
import starFilled from "../../assets/images/star_filled.svg";
import starEmpty from "../../assets/images/star_empty.svg";

const MAX_STARS = 3;

export default function StarRating({ stars }: { stars: StarCount }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <img
          key={i}
          src={i < stars ? starFilled : starEmpty}
          className="w-5 h-5"
        />
      ))}
    </div>
  );
}
