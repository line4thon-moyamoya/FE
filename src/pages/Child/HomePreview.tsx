import { useNavigate } from "react-router-dom";

import ChildHeader from "../../components/common/ChildHeader/ChildHeader";
import Footer from "../../components/common/Footer/Footer";
import MicButton from "../../components/common/MicButton/MicButton";
import Moya from "../../components/common/Moya/Moya";
import SpeechBubble from "../../components/common/SpeechBubble/SpeechBubble";
import { MOYA_LOOK_INFO } from "../../constants/moyaLook";
import { findChildProfile } from "../../mocks/child";
import { getCurrentChildId } from "../../utils/currentChild";
import { getCurrentLook } from "../../utils/currentLook";

/**
 * 고른 모야가 홈에서 어떻게 보이는지 미리 둘러보는 화면.
 * 생김새는 아이 모드 홈과 같고, 무엇을 눌러도 홈으로 들어감.
 */
export default function HomePreview() {
  const navigate = useNavigate();
  const child = findChildProfile(getCurrentChildId());
  const look = getCurrentLook();

  const enterHome = () => navigate("/home", { replace: true });

  return (
    <main className="flex h-full flex-col bg-cream pt-[62px] pb-[113px]">
      <ChildHeader
        childName={child.name}
        coupons={child.coupons}
        onCouponClick={enterHome}
        onGuardianClick={enterHome}
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-[22px] px-6 pt-[18px] pb-[14px]">
        <div className="flex h-[100px] w-[270px] flex-col justify-end">
          <SpeechBubble text={MOYA_LOOK_INFO[look].greeting} />
        </div>

        <div className="relative h-[276px] w-[300px]">
          <Moya
            look={look}
            mood="excited"
            size={290}
            glow
            className="absolute -top-[14px] left-[5px]"
          />
        </div>

        <MicButton state="idle" label="눌러서 말하기" onClick={enterHome} />
      </div>

      <Footer />
    </main>
  );
}
