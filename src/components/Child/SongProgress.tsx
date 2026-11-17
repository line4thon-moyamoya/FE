import { formatTime } from "../../utils/formatTime";

interface SongProgressProps {
  progress: number; // 0 ~ 1
  currentSec: number;
  duration: number;
}

export default function SongProgress({ progress, currentSec, duration }: SongProgressProps) {
  const percent = Math.min(Math.max(progress, 0), 1) * 100;

  return (
    <div className="w-full">
      <div
        role="progressbar"
        aria-valuenow={Math.floor(currentSec)}
        aria-valuemin={0}
        aria-valuemax={Math.floor(duration)}
        className="h-2 w-full overflow-hidden rounded-full bg-[#E4DFF5]"
      >
        {/* 매 프레임 갱신하므로 transition 을 걸면 막대가 뒤처짐 */}
        <div
          className="h-full rounded-full bg-[#6A4FF3]"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-[6px] flex justify-between font-noto text-xs font-bold text-[#9E98BF]">
        <span>{formatTime(currentSec)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}