import check from "../../../assets/icons/check.svg";
import speaker from "../../../assets/icons/speaker-lg.svg";
import wordBook from "../../../assets/icons/word-book.svg";
import arrow from "../../../assets/icons/arrow.svg";

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
  icon?: "check" | "wordBook" | "mic" | "speaker";
  showArrow?: boolean;
  /** 가로를 꽉 채움. 끄면 346px 고정 */
  fullWidth?: boolean;
  disabled?: boolean;
}

const ICON_SRC = {
  check,
  wordBook,
  speaker,
};

/* 마이크는 버튼 종류에 따라 색이 달라서 인라인으로 그림 */
function MicIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M15.5 6.2998C15.5 4.36681 13.933 2.7998 12 2.7998C10.067 2.7998 8.5 4.36681 8.5 6.2998V10.7998C8.5 12.7328 10.067 14.2998 12 14.2998C13.933 14.2998 15.5 12.7328 15.5 10.7998V6.2998Z"
        fill="currentColor"
      />
      <path
        d="M5.5 11.5C5.5 13.2239 6.18482 14.8772 7.40381 16.0962C8.62279 17.3152 10.2761 18 12 18M12 18C13.7239 18 15.3772 17.3152 16.5962 16.0962C17.8152 14.8772 18.5 13.2239 18.5 11.5M12 18V21"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
      {icon === "mic" ? (
        <MicIcon />
      ) : (
        icon && <img src={ICON_SRC[icon]} alt="" className="h-6 w-6" />
      )}
      {text}
      {showArrow && <img src={arrow} alt="" className="absolute right-4 h-6 w-6" />}
    </button>
  );
}
