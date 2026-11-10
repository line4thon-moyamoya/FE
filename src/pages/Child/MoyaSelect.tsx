import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MoyaLookCard from "../../components/Child/MoyaLookCard";
import SpeechBubble from "../../components/common/SpeechBubble/SpeechBubble";
import { setCurrentLook } from "../../utils/currentLook";
import { MOYA_LOOKS, type MoyaLook } from "../../types/moya";
import { getCurrentChildId } from "../../utils/currentChild";

/** 고른 모야를 보여 주다가 홈으로 넘어가기까지 */
const MOVE_DELAY_MS = 700;

export default function MoyaSelect() {
  const navigate = useNavigate();
  const [picked, setPicked] = useState<MoyaLook | null>(null);

  const handlePick = (look: MoyaLook) => {
    if (picked) return;

    setPicked(look);
    setCurrentLook(look);
    // 고른 모야가 신나하는 모습을 잠깐 보여 준 뒤 홈으로.
    // 방금 골랐다고 알려 주면 홈이 첫인사를 먼저 건넨다
    window.setTimeout(
      () =>
        navigate(`/children/${getCurrentChildId()}/home`, {
          replace: true,
          state: { justPicked: true },
        }),
      MOVE_DELAY_MS,
    );
  };

  return (
    <main className="pt-status flex h-full flex-col bg-cream pb-[34px]">
      <div className="flex flex-1 flex-col items-center gap-[22px] px-6 pt-6">
        <SpeechBubble text={"어떤 모야랑 놀까?\n하나 골라줘!"} />

        <div className="flex flex-col gap-3">
          {MOYA_LOOKS.map((look) => (
            <MoyaLookCard
              key={look}
              look={look}
              selected={picked === look}
              onClick={() => handlePick(look)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
