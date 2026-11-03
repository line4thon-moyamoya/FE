import { MOYA_LOOKS, type MoyaLook } from "../../types/moya";
import moyaDefault from "../../assets/images/moya/default/moya_greeting.png";
import moyaCar from "../../assets/images/moya/car/moya_car_greeting.png";
import moyaPrincess from "../../assets/images/moya/princess/moya_princess_greeting.png";

const MOYA_IMAGES: Record<MoyaLook, string> = {
  default: moyaDefault,
  car: moyaCar,
  princess: moyaPrincess,
};

// 카드 아래 짧은 이름
const SHORT_LABEL: Record<MoyaLook, string> = {
  default: "기본",
  car: "자동차",
  princess: "공주",
};

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
              <img
                src={MOYA_IMAGES[look]}
                className="w-[84px] h-[84px] object-contain"
              />
              <span
                className={`font-noto text-xs font-bold ${
                  isSelected ? "text-[#6A4FF3]" : "text-[#9E98BF]"
                }`}
              >
                {SHORT_LABEL[look]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
