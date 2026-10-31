import BackButton from "../common/BackButton/BackButton";

interface StepHeaderProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
}

export default function StepHeader({ step, totalSteps, onBack }: StepHeaderProps) {
  return (
    <div className="relative flex items-center">
      <BackButton onClick={onBack} />

      {/* 단계 표시 + 진행 바 (정가운데) */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 mt-[60px]">
        <span className="font-noto text-xs font-bold text-[#6F6A8C]">
          {step} / {totalSteps}
        </span>
        <div className="h-1.5 w-[120px] rounded-[3px] bg-[#EEEAFF]">
          <div
            className="h-full rounded-[3px] bg-[#7B61F8] transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}