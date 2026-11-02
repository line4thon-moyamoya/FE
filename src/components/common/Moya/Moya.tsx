import type { MoyaLook, MoyaMood } from "../../../types/moya";
import { MOYA_ALT, MOYA_IMAGES } from "./moyaAssets";

interface MoyaProps {
  look?: MoyaLook;
  mood?: MoyaMood;
  /** 한 변의 길이(px). 캐릭터는 정사각형 */
  size?: number;
  /** 캐릭터 뒤 보랏빛 후광 */
  glow?: boolean;
  className?: string;
}

export default function Moya({
  look = "default",
  mood = "greeting",
  size = 290,
  glow = false,
  className = "",
}: MoyaProps) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: size * 1.03,
            height: size * 1.03,
            background:
              "radial-gradient(circle at 50% 50%, rgba(228,219,255,0.95) 0%, rgba(237,231,255,0.55) 55%, rgba(243,239,255,0) 100%)",
          }}
        />
      )}
      <img
        src={MOYA_IMAGES[look][mood]}
        alt={MOYA_ALT[mood]}
        width={size}
        height={size}
        className="relative h-full w-full object-contain select-none"
        draggable={false}
      />
    </div>
  );
}
