import { useNavigate } from "react-router-dom";
import backButton from "../../../assets/images/back_button.svg";

interface BackButtonProps {
  onClick?: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  const navigate = useNavigate();

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
      className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white mt-[68px] ml-6
        shadow-[0px_4px_0px_0px_rgba(250,237,209,1.00)] border-2 border-[#EFE6D3]"
    >
      <img src={backButton} />
    </button>
  );
}
