import right from "../../assets/icons/chevron-right.svg";

type SettingItemVariant = "default" | "primary" | "danger" | "muted";

interface SettingItemProps {
  label: string;
  onClick: () => void;
  variant?: SettingItemVariant;
}

const TEXT_COLORS: Record<SettingItemVariant, string> = {
  default: "text-[#241F48]",
  primary: "text-[#6A4FF3]",
  danger: "text-[#FF6B5B]",
  muted: "text-[#6F6A8C]",
};

export default function SettingItem({
  label,
  onClick,
  variant = "default",
}: SettingItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full cursor-pointer items-center justify-between px-4 py-[15px] text-left"
      >
        <span className={`font-jua text-[15px] leading-[1.55] font-normal ${TEXT_COLORS[variant]}`}>
          {label}
        </span>
        <img src={right} className="w-[18px] h-[18px]" />
      </button>
    </li>
  );
}