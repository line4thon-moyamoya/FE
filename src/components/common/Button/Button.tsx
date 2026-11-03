import check from "../../../assets/icons/check_icon.svg";
import wordBook from "../../../assets/icons/word_book.svg";
import arrow from "../../../assets/images/arrow.svg";

/** 주요(보라) / 보조(흰 테두리) / 점선 */
type ButtonVariant = "primary" | "secondary" | "dashed";
/** 보통 60px / 크게 66px */
type ButtonSize = "normal" | "large";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** 라벨 앞에 붙는 아이콘 */
  icon?: "check" | "wordBook";
  showArrow?: boolean;
  /** 가로를 꽉 채움. 끄면 346px 고정 */
  fullWidth?: boolean;
  disabled?: boolean;
}

const ICON_SRC = {
  check,
  wordBook,
};

const SIZE_STYLE: Record<ButtonSize, string> = {
  normal: "h-[60px] rounded-[20px] text-xl leading-[1.2]",
  large: "h-[66px] rounded-3xl text-2xl leading-8",
};

const VARIANT_STYLE: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white",
  secondary: "bg-white border-2 border-line-lavender text-brand-action shadow-button-secondary",
  dashed: "border-2 border-dashed border-brand-light text-ink-soft",
};

export default function Button({
  text,
  onClick,
  variant = "primary",
  size = "large",
  icon,
  showArrow = false,
  fullWidth = false,
  disabled,
}: ButtonProps) {
  // 주요 버튼은 크기에 따라 입체 그림자가 다름
  const primaryShadow =
    variant === "primary" ? (size === "large" ? "shadow-button" : "shadow-button-primary") : "";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative flex cursor-pointer items-center justify-center gap-2 px-5
        font-jua font-normal disabled:opacity-40
        ${fullWidth ? "w-full" : "w-[346px]"}
        ${SIZE_STYLE[size]} ${VARIANT_STYLE[variant]} ${primaryShadow}`}
    >
      {icon && <img src={ICON_SRC[icon]} alt="" className="h-6 w-6" />}
      {text}
      {showArrow && <img src={arrow} alt="" className="absolute right-4 h-6 w-6" />}
    </button>
  );
}
