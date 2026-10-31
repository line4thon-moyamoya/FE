import { useNavigate } from "react-router-dom";
import backButton from "../../../assets/images/back_button.svg";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white mt-[68px]
        shadow-[0px_4px_0px_0px_rgba(250,237,209,1.00)] border-2 border-[#EFE6D3]"
    >
      <img src={backButton} />
    </button>
  );
}
