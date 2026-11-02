import mic from "../../../assets/icons/mic.svg";

export type MicState = "idle" | "listening" | "thinking";

interface MicButtonProps {
  state?: MicState;
  label?: string;
  onClick?: () => void;
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

        {/* mic.svg 는 24x24 안에 가운데 정렬돼 있어 88px 로 키우면 그림이 48x67 이 됨 */}
        {listening ? (
          <span className="absolute top-6 left-[35px]">
            <WaveIcon />
          </span>
        ) : (
          <img
            src={mic}
            alt=""
            className="absolute inset-0 m-auto h-[88px] w-[88px]"
          />
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
