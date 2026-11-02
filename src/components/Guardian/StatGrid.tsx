import type { WeeklySummary } from "../../types/guardian";

interface StatGridProps {
  summary: WeeklySummary;
  variant?: "purple" | "white";
}

const VARIANT_STYLES = {
  purple: "bg-[#F6F3FF]",
  white: "bg-white shadow-[0px_4px_12px_0px_rgba(91,69,200,0.06)]",
};

export default function StatGrid({ summary, variant = "purple" }: StatGridProps) {
  const stats = [
    { label: "물어본 단어", value: summary.askedCount },
    { label: "복습 끝냄", value: summary.reviewedCount },
    { label: "못 찾은 말", value: summary.missingCount },
  ];

  return (
    <ul className="grid grid-cols-3 gap-2">
      {stats.map(({ label, value }) => (
        <li
          key={label}
          className={`flex flex-col justify-start items-start gap-0.5 rounded-2xl p-3 ${VARIANT_STYLES[variant]}`}
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
  );
}