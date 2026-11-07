import { useEffect, useRef, useState } from "react";
import speaker from "../../../assets/icons/speaker.svg";

interface ReplayButtonProps {
  onPlay?: () => void;
  /** 재생 중 표시를 유지하는 시간(ms) */
  duration?: number;
  className?: string;
}

export default function ReplayButton({
  onPlay,
  duration = 1200,
  className = "",
}: ReplayButtonProps) {
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | null>(null);

  // 재생 중에 화면을 벗어나면 타이머를 정리
  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const handleClick = () => {
    onPlay?.();
    setPlaying(true);
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPlaying(false), duration);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="다시 듣기"
      className={`flex h-[30px] w-[30px] shrink-0 cursor-pointer items-center justify-center
        rounded-full border-2 border-white transition-colors duration-150
        ${playing ? "bg-brand-action shadow-[0_0_0_5px_rgba(217,209,255,1)]" : "bg-brand shadow-replay"}
        ${className}`}
    >
      <img src={speaker} alt="" className="h-4 w-4" />
    </button>
  );
}
