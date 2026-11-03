import Button from "../common/Button/Button";
import MoyaAside from "./MoyaAside";
import PlaceTile from "./PlaceTile";
import { MOCK_HEARD_PLACES } from "../../mocks/talk";
import type { HeardPlace } from "../../types/child";

interface HeardPlacePickProps {
  onPick: (place: HeardPlace) => void;
  /** 잘 모르겠어 */
  onSkip: () => void;
}

export default function HeardPlacePick({ onPick, onSkip }: HeardPlacePickProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 px-6 pt-[18px] pb-[14px]">
      <MoyaAside line={"어디서 들었어?\n골라 줘!"} />

      <div className="flex flex-col gap-9">
        <div className="flex flex-wrap gap-3">
          {MOCK_HEARD_PLACES.map((place) => (
            <PlaceTile key={place.id} place={place} onClick={() => onPick(place)} />
          ))}
        </div>

        <Button text="잘 모르겠어" variant="dashed" size="normal" fullWidth onClick={onSkip} />
      </div>
    </div>
  );
}
