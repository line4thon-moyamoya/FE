import type { WordRecord } from "../../types/guardian";
import StarRating from "./StarRating";
import { iraGo } from "../../utils/josa";

const DEFAULT_BG_COLOR = "#F6F3FF";

export default function WordRecordItem({ record }: { record: WordRecord }) {
  return (
    <li className="flex items-center gap-3 px-4 py-3">

      <div
        className="flex w-11 h-11 items-center justify-center rounded-xl"
        style={{ backgroundColor: record.bgColor ?? DEFAULT_BG_COLOR }}
      >
        {record.image ? (
          <img src={record.image} className="w-9 h-9" />
        ) : (
          <span className="font-jua text-lg text-[#6A4FF3]">
            {record.word[0]}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-0.5">
        <p className="font-jua text-xl font-normal leading-7 text-[#241F48]">
          {record.word}
        </p>
        <p className="font-noto text-xs font-bold leading-4 text-[#6F6A8C]">
          ‘{record.spokenAs}’{iraGo(record.spokenAs)} 말함
        </p>
      </div>

      <StarRating stars={record.stars} />
    </li>
  );
}