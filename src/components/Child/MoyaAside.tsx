import Moya from "../common/Moya/Moya";
import SpeechBubble from "../common/SpeechBubble/SpeechBubble";
import type { MoyaMood } from "../../types/moya";
import { useChildMode } from "../../contexts/ChildModeContext";

interface MoyaAsideProps {
  line: string;
  mood?: MoyaMood;
  /** 모야 크기(px) */
  moyaSize?: number;
  onReplay?: () => void;
}

/** 모야가 왼쪽에 작게 서고 말풍선이 오른쪽에 붙는 묶음 */
export default function MoyaAside({
  line,
  mood = "curious",
  moyaSize = 100,
  onReplay,
}: MoyaAsideProps) {
  const { child } = useChildMode();
  return (
    <div className="flex h-[104px] w-full items-center gap-1">
      <Moya look={child.look} mood={mood} size={moyaSize} />
      <SpeechBubble text={line} tail="left" width="fill" onReplay={onReplay} />
    </div>
  );
}
