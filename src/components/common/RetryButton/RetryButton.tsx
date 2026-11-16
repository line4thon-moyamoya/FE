import retryMic from "../../../assets/icons/retry-mic.svg";

interface RetryButtonProps {
  onClick?: () => void;
  /** 화면 낭독기가 읽을 말. 화면마다 조금씩 다르다 */
  label?: string;
}

/**
 * 다시 말하기 버튼.
 * 화면에 버튼이 너무 많아지지 않도록 글자 대신 회전 화살표 아이콘만 둔다.
 * 그림에 그림자가 들어 있어 높이가 너비보다 5px 크다.
 */
export default function RetryButton({
  onClick,
  label = "다시 말하기",
}: RetryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="h-[53px] w-12 shrink-0 cursor-pointer"
    >
      <img src={retryMic} alt="" className="h-full w-full" />
    </button>
  );
}
