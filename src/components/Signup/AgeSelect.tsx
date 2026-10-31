import type { AgeGroup } from "../../types/signup";

interface AgeSelectProps {
  value: AgeGroup | null;
  onChange: (value: AgeGroup) => void;
}

const selectedStyle = "bg-[#7B61F8] text-white text-xl font-normal font-jua leading-6 shadow-[0px_4px_0px_0px_rgba(74,53,201,1.00)]";
const defaultStyle = "border-2 border-[#E0DDD7] text-xl font-normal font-jua leading-6 bg-white text-[#241F48]";

export default function AgeSelect({ value, onChange }: AgeSelectProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="font-noto text-xs font-bold text-[#6F6A8C]">나이</span>

      <div className="flex gap-[10px]">
        <button
          type="button"
          onClick={() => onChange("3-4")}
          className={`h-[52px] w-[170px] rounded-2xl font-jua text-lg ${
            value === "3-4" ? selectedStyle : defaultStyle
          }`}
        >
          만 3~4세
        </button>

        <button
          type="button"
          onClick={() => onChange("5")}
          className={`h-[52px] w-[170px] rounded-2xl font-jua text-lg ${
            value === "5" ? selectedStyle : defaultStyle
          }`}
        >
          만 5세
        </button>
      </div>
    </div>
  );
}