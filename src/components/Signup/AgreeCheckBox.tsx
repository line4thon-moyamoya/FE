import rightButton from "../../assets/images/right_button.svg";
import checkIcon from "../../assets/icons/check_icon.svg";

interface AgreeCheckboxProps {
  text: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function AgreeCheckbox({ text, checked, onChange }: AgreeCheckboxProps) {
  return (
    <div className="flex w-full items-center justify-between pr-6">
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />

        <span
          className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-[#D9D4F5] bg-white
            peer-checked:border-[#7B61F8] peer-checked:bg-[#7B61F8]
            peer-focus-visible:ring-2 peer-focus-visible:ring-[#7B61F8]/40"
        >
          {checked && <img src={checkIcon} alt="" />}
        </span>

        {/* 문구 */}
        <span className="font-noto text-sm leading-5 font-bold text-[#241F48]">
          <span className="text-[#6A4FF3]">[필수]</span> {text}
        </span>
      </label>

      <img src={rightButton} alt="" />
    </div>
  );
}