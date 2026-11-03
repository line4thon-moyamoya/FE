import { formatTime } from "../../utils/formatTime";

interface SongProgressProps {
  progress: number; // 0 ~ 1
  currentSec: number;
  duration: number;
}

export default function SongProgress({ progress, currentSec, duration }: SongProgressProps) {
  return (
    <div className="w-full">
      <div
        role="progressbar"
        aria-valuenow={Math.floor(currentSec)}
        aria-valuemin={0}
        aria-valuemax={duration}
        className="h-2 w-[354px] overflow-hidden rounded-full bg-[#E4DFF5]"
      >
        <div
          className="h-full rounded-full bg-[#6A4FF3] transition-[width] duration-200"
          style={{ width: `${Math.min(progress, 1) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-[6px] font-noto text-xs font-bold text-[#9E98BF]">
        <span>{formatTime(currentSec)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}