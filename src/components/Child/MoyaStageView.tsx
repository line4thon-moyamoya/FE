import soundwave from "../../assets/icons/soundwave.svg";
import MicButton from "../common/MicButton/MicButton";
import Moya from "../common/Moya/Moya";
import SpeechBubble from "../common/SpeechBubble/SpeechBubble";
import { TALK_STAGE_VIEW } from "../../constants/talkStage";
import type { MoyaStage } from "../../types/child";
import { getCurrentLook } from "../../utils/currentLook";

/* 모야 주변에 뿌려지는 노란 반짝이 */
function Sparkle({ size, left, top }: { size: number; left: number; top: number }) {
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

/* 듣는 중일 때 모야 양옆에서 퍼지는 소리 물결.
   에셋의 호가 왼쪽으로 열려 있어 오른쪽 자리에서는 뒤집어 씀 */
function SoundWave({ side }: { side: "left" | "right" }) {
  return (
    <img
      src={soundwave}
      alt=""
      aria-hidden
      className={`absolute top-[109px] h-11 w-[30px] ${
        side === "left" ? "left-[6px]" : "left-[264px] -scale-x-100"
      }`}
    />
  );
}

interface MoyaStageViewProps {
  stage: MoyaStage;
  /** 기다리는 중일 때 쓰는 아이별 인사말 */
  greeting: string;
  onMicClick: () => void;
}

export default function MoyaStageView({ stage, greeting, onMicClick }: MoyaStageViewProps) {
  const view = TALK_STAGE_VIEW[stage];

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[22px] px-6 pt-[18px] pb-[14px]">
      {/* 대사 줄 수가 바뀌어도 모야가 움직이지 않도록 높이를 고정 */}
      <div className="flex h-[100px] w-[270px] flex-col justify-end">
        <SpeechBubble text={view.line ?? greeting} />
      </div>

      {/* 모야 무대. 캐릭터가 위로 조금 삐져나오도록 둠 */}
      <div className="relative h-[276px] w-[300px]">
        {view.shadow && (
          <span
            aria-hidden
            className="absolute top-[252px] left-[65px] h-6 w-[170px] rounded-[50%] bg-line-warm blur-[2px]"
          />
        )}

        <Moya
          look={getCurrentLook()}
          mood={view.mood}
          size={290}
          glow
          className="absolute -top-[14px] left-[5px]"
        />

        {view.sparkles && (
          <>
            <Sparkle size={24} left={17} top={65} />
            <Sparkle size={18} left={41} top={93} />
            <Sparkle size={18} left={232} top={47} />
          </>
        )}

        {view.soundWave && (
          <>
            <SoundWave side="left" />
            <SoundWave side="right" />
          </>
        )}
      </div>

      <MicButton state={view.micState} label={view.micLabel} onClick={onMicClick} />
    </div>
  );
}
