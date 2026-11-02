import type { MicState } from "../components/common/MicButton/MicButton";
import type { TalkStage } from "../types/child";
import type { MoyaMood } from "../types/moya";

interface TalkStageView {
  /** 모야 대사. null 이면 아이별 인사말을 씀 */
  line: string | null;
  mood: MoyaMood;
  micState: MicState;
  micLabel: string;
  /** 모야 옆 소리 물결 */
  soundWave: boolean;
  /** 모야 주변 노란 반짝이 */
  sparkles: boolean;
  /** 모야 발밑 그림자 */
  shadow: boolean;
}

export const TALK_STAGE_VIEW: Record<TalkStage, TalkStageView> = {
  idle: {
    line: null,
    mood: "explain",
    micState: "idle",
    micLabel: "눌러서 말하기",
    soundWave: false,
    sparkles: true,
    shadow: false,
  },
  listening: {
    line: "응, 응. 듣고있어!",
    mood: "curious",
    micState: "listening",
    micLabel: "듣고 있어…",
    soundWave: true,
    sparkles: false,
    shadow: true,
  },
  thinking: {
    line: "음… 무슨 말인지\n찾아볼게!",
    mood: "curious",
    micState: "thinking",
    micLabel: "모야가 찾고 있어",
    soundWave: false,
    sparkles: false,
    shadow: true,
  },
};
