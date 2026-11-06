import Moya from "../common/Moya/Moya";
import { MOYA_LOOK_INFO } from "../../constants/moyaLook";
import { MOYA_LOOKS, type MoyaLook } from "../../types/moya";

interface MoyaLookSelectorProps {
  value: MoyaLook | null;
  onChange: (value: MoyaLook) => void;
}

export default function MoyaLookSelector({
  value,
  onChange,
}: MoyaLookSelectorProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="font-noto text-xs font-bold text-[#6F6A8C]">
        모야 변신
      </span>

      <div className="grid grid-cols-3 gap-2.5">
        {MOYA_LOOKS.map((look) => {
          const isSelected = value === look;

          return (
            <button
              key={look}
              type="button"
              onClick={() => onChange(look)}
              aria-pressed={isSelected}
              className={`cursor-pointer flex flex-col items-center gap-1 rounded-3xl bg-white pt-2 pb-2.5 border-3 ${
                isSelected ? "border-[#6A4FF3]" : "border-[#E4DFF5]"
              }`}
            >
              <Moya look={look} mood="greeting" size={84} />
              <span
                className={`font-noto text-xs font-bold ${
                  isSelected ? "text-[#6A4FF3]" : "text-[#9E98BF]"
                }`}
              >
                {MOYA_LOOK_INFO[look].shortLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
