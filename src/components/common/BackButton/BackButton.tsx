import { useNavigate } from "react-router-dom";
import backButton from "../../../assets/images/back_button.svg";
import closeButton from "../../../assets/icons/close_icon.svg";

interface BackButtonProps {
  variant?: "back" | "close";
  onClick?: () => void;
}

const ICONS = {
  back: { src: backButton, label: "뒤로가기" },
  close: { src: closeButton, label: "닫기" },
};

export default function BackButton({ variant = "back", onClick }: BackButtonProps) {
  const navigate = useNavigate();
  const { src, label } = ICONS[variant];

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white mt-[68px] ml-6
        shadow-[0px_4px_0px_0px_rgba(250,237,209,1.00)] border-2 border-[#EFE6D3]"
    >
      <img src={src} alt="" />
    </button>
  );
}