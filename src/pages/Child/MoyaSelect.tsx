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

    const childId = getCurrentChildId();

    // 홈은 서버에서 모야를 받아 오므로 저장이 끝난 뒤에 넘어가야 한다.
    // 저장에 실패해도 진행은 막지 않는다 (로컬 값으로 보여 준다)
    const saved = childId
      ? updateChild(childId, { moyaLook: look })
          .catch(() => null)
          .finally(() => sessionStorage.removeItem("parentModeToken"))
      : Promise.resolve(null);

    // 고른 모야가 신나하는 모습을 잠깐 보여 준 뒤 홈으로.
    // 방금 골랐다고 알려 주면 홈이 첫인사를 먼저 건넨다
    const shown = new Promise((resolve) =>
      window.setTimeout(resolve, MOVE_DELAY_MS),
    );

    void Promise.all([saved, shown]).then(() =>
      navigate(`/children/${childId}/home`, {
        replace: true,
        state: { justPicked: true },
      }),
    );
  };

  return (
    <main className="pt-status flex h-full flex-col bg-cream">
      <div className="flex min-h-0 flex-1 flex-col items-center px-6">
        <div aria-hidden className="min-h-0 w-full flex-1 max-h-[24px]" />
        <SpeechBubble text={"어떤 모야랑 놀까?\n하나 골라줘!"} />

        <div aria-hidden className="min-h-0 w-full flex-1 max-h-[22px]" />
        <div className="flex min-h-0 w-full flex-col gap-3">
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
      <div aria-hidden className="min-h-0 w-full flex-1 max-h-[34px]" />
    </main>
  );
}
