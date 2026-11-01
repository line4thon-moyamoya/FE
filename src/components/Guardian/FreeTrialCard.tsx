import type { FreeTrial } from "../../types/guardian";
import right from "../../assets/icons/right_icon.svg";

interface FreeTrialCardProps {
  freeTrial: FreeTrial;
  onSubscribeClick: () => void;
}

export default function FreeTrialCard({
  freeTrial,
  onSubscribeClick,
}: FreeTrialCardProps) {
  const { used, total } = freeTrial;

  const percent = Math.min(100, Math.max(0, (used / total) * 100)); // 0~100% 사이로 제한

  return (
    <section className="w-full flex flex-col justify-start items-start gap-2.5 bg-white rounded-3xl py-4 px-[18px] shadow-[0px_5px_0px_0px_rgba(231,228,243,1.00)]">
      <div className="w-full flex items-center justify-between">
        <h2 className="font-jua text-base font-normal leading-6 text-[#241F48]">
          무료 체험 질문
        </h2>
        <span className="font-jua text-base font-normal leading-6 text-[#6A4FF3]">
          {used} / {total}
        </span>
      </div>

      {/* 진행 바 */}
      <div className="h-2 w-[318px] rounded-sm bg-[#EEEAFF]">
        <div
          className="h-full rounded-full bg-[#7B61F8] transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      <button
        type="button"
        onClick={onSubscribeClick}
        className="cursor-pointer flex w-full items-center justify-between font-normal font-jua text-base leading-6 text-[#6A4FF3]"
      >
        구독 알아보기
        <img src={right} className="w-[18px] h-[18px]" />
      </button>
    </section>
  );
}
