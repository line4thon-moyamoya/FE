import { useNavigate } from "react-router-dom";

import ChildHeader from "../../components/common/ChildHeader/ChildHeader";
import Footer from "../../components/common/Footer/Footer";
import MicButton from "../../components/common/MicButton/MicButton";
import Moya from "../../components/common/Moya/Moya";
import SpeechBubble from "../../components/common/SpeechBubble/SpeechBubble";
import { findChildProfile } from "../../mocks/child";
import { getCurrentChildId } from "../../utils/currentChild";

/* 모야 주변에 뿌려지는 노란 반짝이 */
function Sparkle({
  size,
  left,
  top,
}: {
  size: number;
  left: number;
  top: number;
}) {
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

export default function ChildHome() {
  const navigate = useNavigate();
  const child = findChildProfile(getCurrentChildId());

  return (
    <main className="flex h-full flex-col bg-cream pt-[62px] pb-[113px]">
      <ChildHeader
        childName={child.name}
        coupons={child.coupons}
        onCouponClick={() => alert("노래 쿠폰은 준비 중이에요")}
        onGuardianClick={() => navigate("/guardian/password")}
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-[22px] px-6 pt-[18px] pb-[14px]">
        <SpeechBubble text={child.greeting} />

        {/* 모야 무대. 캐릭터가 위로 조금 삐져나오도록 둠 */}
        <div className="relative h-[276px] w-[300px]">
          <Moya
            look="default"
            mood="explain"
            size={290}
            glow
            className="absolute -top-[14px] left-[5px]"
          />
          <Sparkle size={24} left={17} top={65} />
          <Sparkle size={18} left={41} top={93} />
          <Sparkle size={18} left={232} top={47} />
        </div>

        <MicButton state="idle" label="눌러서 말하기" />
      </div>

      <Footer />
    </main>
  );
}
