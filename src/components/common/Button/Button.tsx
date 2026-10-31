import arrow from "../../../assets/images/arrow.svg";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  showArrow?: boolean;
  disabled?: boolean;
}

export default function Button({
  text,
  onClick,
  showArrow = false,
  disabled,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="relative flex h-[66px] w-[346px] items-center justify-center rounded-3xl
        bg-[#7B61F8] font-jua text-2xl leading-8 font-normal text-white disabled:opacity-40
        shadow-[0px_6px_0px_0px_rgba(106,79,243,1),0px_12px_16px_0px_rgba(123,97,248,0.16)] cursor-pointer"
    >
      {text}
      {showArrow && (
        <img src={arrow} alt="" className="absolute right-4 h-6 w-6" />
      )}
    </button>
  );
}
