import ReplayButton from "../ReplayButton/ReplayButton";

type TailSide = "bottom" | "left" | "none";

interface SpeechBubbleProps {
  /** 모야 대사 */
  text: string;
  tail?: TailSide;
  showReplay?: boolean;
  onReplay?: () => void;
  /** 말풍선 가로 길이(px) */
  width?: number;
  className?: string;
}

/** 말풍선 꼬리 */
function Tail({ side }: { side: Exclude<TailSide, "none"> }) {
  const bottom = side === "bottom";

  return (
    <svg
      aria-hidden
      width={bottom ? 24 : 14}
      height={bottom ? 14 : 24}
      viewBox={bottom ? "0 0 24 14" : "0 0 14 24"}
      fill="none"
      className={
        bottom
          ? "absolute -bottom-3 left-1/2 -translate-x-1/2"
          : "absolute -left-3 top-1/2 -translate-y-1/2"
      }
    >
      <path
        d={bottom ? "M1 1 L12 12.5 L23 1" : "M13 1 L1.5 12 L13 23"}
        fill="#FFFFFF"
        stroke="#E0DDD7"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SpeechBubble({
  text,
  tail = "bottom",
  showReplay = true,
  onReplay,
  width = 270,
  className = "",
}: SpeechBubbleProps) {
  return (
    <div
      style={{ width }}
      className={`relative flex items-center gap-3 rounded-3xl border-2 border-line-warm
        bg-white py-[18px] pr-[30px] pl-5 shadow-bubble ${className}`}
    >
      <p className="flex-1 text-center font-jua text-xl leading-[1.5] font-normal whitespace-pre-line text-ink">
        {text}
      </p>

      {showReplay && <ReplayButton onPlay={onReplay} />}

      {tail !== "none" && <Tail side={tail} />}
    </div>
  );
}
