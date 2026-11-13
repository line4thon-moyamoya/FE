import Button from "../common/Button/Button";
import MoyaAside from "./MoyaAside";
import PlaceTile from "./PlaceTile";
import { MOCK_HEARD_PLACES } from "../../mocks/talk";
import type { HeardContext } from "../../api/question";

interface HeardPlacePickProps {
  onPick: (context: HeardContext) => void;
  /** 잘 모르겠어 */
  onSkip: () => void;
}

/** 화면의 들은 곳을 서버가 쓰는 값으로 */
const PLACE_CONTEXT: Record<string, HeardContext> = {
  tv: "TV_YOUTUBE",
  parents: "PARENTS",
  book: "BOOK",
  kindergarten: "KINDERGARTEN",
};

export default function HeardPlacePick({ onPick, onSkip }: HeardPlacePickProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 px-6 pt-[18px] pb-[14px]">
      <MoyaAside line={"어디서 들었어?\n골라 줘!"} />

      <div className="flex flex-col gap-9">
        <div className="grid grid-cols-2 gap-3">
          {MOCK_HEARD_PLACES.map((place) => (
            <PlaceTile key={place.id} place={place} onClick={() => onPick(PLACE_CONTEXT[place.id])} />
          ))}
        </div>

        <Button text="잘 모르겠어" variant="dashed" size="normal" fullWidth onClick={onSkip} />
      </div>
    </div>
  );
}
