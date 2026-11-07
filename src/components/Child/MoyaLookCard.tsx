import check from "../../assets/icons/check.svg";
import Moya from "../common/Moya/Moya";
import { MOYA_LOOK_INFO } from "../../constants/moyaLook";
import type { MoyaLook } from "../../types/moya";

interface MoyaLookCardProps {
  look: MoyaLook;
  selected: boolean;
  onClick: () => void;
}

export default function MoyaLookCard({ look, selected, onClick }: MoyaLookCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={MOYA_LOOK_INFO[look].label}
      className={`relative flex h-[170px] w-[354px] cursor-pointer items-center justify-center
        rounded-[28px] shadow-look-card transition-transform duration-100 active:scale-[0.98]
        ${selected ? "bg-line-lavender" : "bg-cream"}`}
    >
      {/* 고르면 신난 표정으로 바뀜 */}
      <Moya look={look} mood={selected ? "excited" : "greeting"} size={158} />

      {selected && (
        <span className="absolute top-[18px] right-[18px] flex h-8 w-8 items-center justify-center rounded-2xl bg-brand-action">
          <img src={check} alt="" className="h-[18px] w-[18px]" />
        </span>
      )}
    </button>
  );
}
