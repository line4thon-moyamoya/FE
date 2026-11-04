interface SparkleProps {
  size: number;
  left: number;
  top: number;
}

/** 모야 주변에 뿌려지는 노란 반짝이 */
export default function Sparkle({ size, left, top }: SparkleProps) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="absolute"
      style={{ left, top }}
    >
      <path
        d="M12 0c0 6.6-5.4 12-12 12 6.6 0 12 5.4 12 12 0-6.6 5.4-12 12-12-6.6 0-12-5.4-12-12Z"
        fill="#FFD25A"
      />
    </svg>
  );
}
