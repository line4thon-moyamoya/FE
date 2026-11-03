export type MicState = "idle" | "listening" | "thinking";

interface MicButtonProps {
  state?: MicState;
  label?: string;
  onClick?: () => void;
}

/* 마이크 아이콘 */
function MicIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <path
        d="M15.5 6.2998C15.5 4.36681 13.933 2.7998 12 2.7998C10.067 2.7998 8.5 4.36681 8.5 6.2998V10.7998C8.5 12.7328 10.067 14.2998 12 14.2998C13.933 14.2998 15.5 12.7328 15.5 10.7998V6.2998Z"
        fill="currentColor"
      />
      <path
        d="M5.5 11.5C5.5 13.2239 6.18482 14.8772 7.40381 16.0962C8.62279 17.3152 10.2761 18 12 18M12 18C13.7239 18 15.3772 17.3152 16.5962 16.0962C17.8152 14.8772 18.5 13.2239 18.5 11.5M12 18V21"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* 듣는 중일 때 마이크 자리에 들어가는 음성 파형 */
function WaveIcon() {
  const bars = [26, 44, 62, 40, 24];

  return (
    <svg
      aria-hidden
      width="48"
      height="67"
      viewBox="0 0 48 67"
      fill="none"
      className="relative"
    >
      {bars.map((height, index) => (
        <rect
          key={index}
          x={2 + index * 10}
          y={(67 - height) / 2}
          width="6"
          height={height}
          rx="3"
          fill="#FFFFFF"
        />
      ))}
    </svg>
  );
}

export default function MicButton({
  state = "idle",
  label = "눌러서 말하기",
  onClick,
}: MicButtonProps) {
  const thinking = state === "thinking";
  const listening = state === "listening";

  const labelColor = thinking
    ? "text-ink-muted"
    : listening
      ? "text-brand-action"
      : "text-ink";

  const ariaLabel = thinking
    ? "모야가 생각하고 있어요"
    : listening
      ? "듣고 있어요. 누르면 멈춰요"
      : label;

  return (
    <div className="flex flex-col items-center gap-[13px]">
      <button
        type="button"
        onClick={onClick}
        disabled={thinking}
        aria-label={ariaLabel}
        className="relative h-[117px] w-[118px] shrink-0 cursor-pointer disabled:cursor-default"
      >
        {/* 듣는 중 파동 */}
        {listening && (
          <span
            aria-hidden
            className="animate-pulse-ring absolute -top-[32px] -left-[29px] h-[176px] w-[176px]
              rounded-full bg-[rgba(160,141,255,0.12)]"
          />
        )}

        {/* 후광 */}
        {!thinking && (
          <span
            aria-hidden
            className={`absolute -top-[14px] -left-[11px] h-[140px] w-[140px] rounded-full
              ${listening ? "bg-[rgba(160,141,255,0.24)]" : "bg-[rgba(160,141,255,0.16)]"}`}
          />
        )}

        {/* 입체 그림자 */}
        <span
          aria-hidden
          className={`absolute top-[5.2px] left-0 h-[111.5px] w-[118px] rounded-[50%]
            ${thinking ? "bg-disabled-depth" : "bg-brand-depth"}`}
        />

        {/* 버튼 면 */}
        <span
          aria-hidden
          className={`absolute top-0 left-0 h-[111.5px] w-[118px] rounded-[50%]
            ${thinking ? "bg-disabled-face" : "bg-linear-to-b from-brand-light to-[#826CF2]"}`}
        />

        {/* 안쪽 면. 위쪽 테두리에 빛이 남도록 살짝 내려서 겹침 */}
        <span
          aria-hidden
          className={`absolute top-[14.7px] left-[12.5px] h-[96.8px] w-[105.5px] rounded-[50%]
            ${thinking ? "bg-[#CEC9DA]" : "bg-linear-to-b from-brand-action to-[#826CF2]"}`}
        />

        {/* 아이콘은 24x24 안에 가운데 정렬돼 있어 88px 로 키우면 그림이 48x67 이 됨 */}
        {listening ? (
          <span className="absolute top-6 left-[35px]">
            <WaveIcon />
          </span>
        ) : (
          <span className="absolute inset-0 m-auto h-[88px] w-[88px] text-white">
            <MicIcon />
          </span>
        )}
      </button>

      <div className="flex items-center gap-2">
        <span className={`font-jua text-[21px] leading-[1.35] font-normal ${labelColor}`}>
          {label}
        </span>

        {thinking && (
          <span aria-hidden className="flex items-center gap-[5px]">
            <span className="animate-think-dot h-[9px] w-[9px] rounded-full bg-brand" />
            <span
              className="animate-think-dot h-[9px] w-[9px] rounded-full bg-brand-light"
              style={{ animationDelay: "0.15s" }}
            />
            <span
              className="animate-think-dot h-[9px] w-[9px] rounded-full bg-line-lavender"
              style={{ animationDelay: "0.3s" }}
            />
          </span>
        )}
      </div>
    </div>
  );
}
