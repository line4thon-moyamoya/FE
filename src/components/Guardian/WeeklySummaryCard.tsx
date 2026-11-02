import type { WeeklySummary } from "../../types/guardian";
import right from "../../assets/icons/right_icon.svg";
import StatGrid from "./StatGrid";

interface WeeklySummaryCardProps {
  childName: string;
  summary: WeeklySummary;
  onReportClick: () => void;
}

export default function WeeklySummaryCard({
  childName,
  summary,
  onReportClick,
}: WeeklySummaryCardProps) {
  return (
    <section className="w-[354px] h-[189px] bg-white rounded-3xl px-[18px] pt-[18px] pb-4 shadow-[0px_5px_0px_0px_rgba(231,228,243,1.00)]">
      <h2 className="font-jua text-xl leading-7 font-normal text-[#241F48]">
        이번 주 {childName}가 물어본 말
      </h2>

      <div className="mt-3">
        <StatGrid summary={summary} />
      </div>

      <button
        type="button"
        onClick={onReportClick}
        className="cursor-pointer flex w-full items-center justify-between mt-[14px] font-jua text-base font-normal text-[#6A4FF3] leading-6"
      >
        주간 리포트 보기
        <img src={right} className="w-[18px] h-[18px]" />
      </button>
    </section>
  );
}
