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
        className="cursor-pointer flex w-full items-center justify-between px-[18px] py-5 text-left"
      >
        <span className={`font-jua text-base font-normal leading-6 ${TEXT_COLORS[variant]}`}>
          {label}
        </span>
        <img src={right} className="w-[18px] h-[18px]" />
      </button>
    </li>
  );
}