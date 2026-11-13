import type { MoyaLook, MoyaMood } from "../../../types/moya";
import { MOYA_ALT, MOYA_IMAGES } from "./moyaAssets";

interface MoyaProps {
  look?: MoyaLook;
  mood?: MoyaMood;
  /** 한 변의 길이. 숫자는 px, 문자열은 CSS 값(예: "96%"). 캐릭터는 정사각형 */
  size?: number | string;
  /** 모야 무대 */
  glow?: boolean;
  glowScale?: number;
  className?: string;
}

export default function Moya({
  look = "default",
  mood = "greeting",
  size = 290,
  glow = false,
  glowScale = 1.4,
  className = "",
}: MoyaProps) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, aspectRatio: "1 / 1", maxWidth: "100%" }}
    >
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            // 캐릭터 크기에 비례. 무대가 줄어도 후광이 같은 비율로 따라간다
            width: `${glowScale * 100}%`,
            height: `${glowScale * 100}%`,
            // 밝은 중심을 좁게 잡고 바깥은 가장자리에 닿기 전에 완전히 사라지게 함
            background:
              "radial-gradient(circle at 50% 50%, rgba(228,219,255,0.95) 0%, rgba(233,226,255,0.68) 18%, rgba(237,231,255,0.42) 38%, rgba(241,236,255,0.16) 62%, rgba(243,239,255,0) 100%)",
          }}
        />
      )}
      <img
        src={MOYA_IMAGES[look][mood]}
        alt={MOYA_ALT[mood]}

        className="relative h-full w-full object-contain select-none"
        draggable={false}
      />
    </div>
  );
}
