interface SparkleProps {
  /** 무대 너비 대비 한 변의 비율. 예: "8%" */
  size: string;
  left: string;
  top: string;
}

/** 모야 주변에 뿌려지는 노란 반짝이. 무대가 줄어도 같은 자리에 있도록 비율로 둔다 */
export default function Sparkle({ size, left, top }: SparkleProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      className="absolute"
      style={{ width: size, aspectRatio: "1 / 1", left, top }}
    >
      <path
        d="M12 0c0 6.6-5.4 12-12 12 6.6 0 12 5.4 12 12 0-6.6 5.4-12 12-12-6.6 0-12-5.4-12-12Z"
        fill="#FFD25A"
      />
    </svg>
  );
}
