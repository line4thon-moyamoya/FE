import type { WeeklySummary } from "../../types/guardian";
import right from "../../assets/icons/right_icon.svg";

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
  const stats = [
    { label: "물어본 단어", value: summary.askedCount },
    { label: "복습 끝냄", value: summary.reviewedCount },
    { label: "못 찾은 말", value: summary.missingCount },
  ];

  return (
    <section className="w-[354px] h-[189px] bg-white rounded-3xl px-[18px] pt-[18px] pb-4 shadow-[0px_5px_0px_0px_rgba(231,228,243,1.00)]">
      <h2 className="font-jua text-xl leading-7 font-normal text-[#241F48]">
        이번 주 {childName}가 물어본 말
      </h2>

      <ul className="grid grid-cols-3 gap-2 mt-3">
        {stats.map(({ label, value }) => (
          <li
            key={label}
            className="flex flex-col justify-start items-start gap-0.5 rounded-2xl bg-[#F6F3FF] p-3"
          >
            <span className="font-jua text-2xl font-normal text-[#6A4FF3]">
              {value}
            </span>
            <span className="text-xs font-bold leading-4 font-noto text-[#6F6A8C]">
              {label}
            </span>
          </li>
        ))}
      </ul>

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
