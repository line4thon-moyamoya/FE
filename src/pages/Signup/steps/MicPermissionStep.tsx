import { useState } from "react";
import type { StepProps } from "../../../types/signup";
import voice from "../../../assets/icons/mic.svg";
import Button from "../../../components/common/Button/Button";
import Moya from "../../../components/common/Moya/Moya";
import SpeechBubble from "../../../components/common/SpeechBubble/SpeechBubble";
import { speak } from "../../../utils/speak";

const LINE = "모야가 네 목소리를 들으려면\n마이크가 필요해!";

export default function MicPermissionStep({
  onNext,
}: Pick<StepProps, "onNext">) {
  const [denied, setDenied] = useState(false);

  const handleMicRequest = async () => {
    try {
      // 브라우저 마이크 권한 요청 창 띄우기
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // 권한 확인만 하고 마이크는 바로 끄기
      stream.getTracks().forEach((track) => track.stop());
      onNext();
    } catch (error) {
      console.error(error);
      setDenied(true);
    }
  };

  return (
    <div className="mt-[75.5px] flex flex-col items-center gap-[22px]">
      <SpeechBubble text={LINE} width={313} onReplay={() => speak(LINE)} />

      <Moya look="default" mood="greeting" size={240} />

      {/* 허용 안내 */}
      <div className="mb-[75px] flex h-[50px] w-[270px] items-center justify-start gap-2.5 rounded-[999px] bg-white py-[10px] pr-4 pl-[10px]">
        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-2xl bg-[#EEEAFF]">
          <img src={voice} alt="" className="h-[18px] w-[18px]" />
        </div>
        <p className="font-jua text-base leading-6 font-normal text-[#241F48]">
          다음 창에서 '허용' 을 눌러 주세요
        </p>
      </div>

      {denied && (
        <p className="font-noto text-sm text-[#E5484D]">
          마이크가 차단됐어요. 브라우저 설정에서 허용해 주세요.
        </p>
      )}

      <Button text="마이크 켜기" onClick={handleMicRequest} />

      <button
        type="button"
        onClick={onNext}
        className="cursor-pointer font-jua text-base leading-6 font-normal text-[#9A96B3]"
      >
        나중에 할게요
      </button>
    </div>
  );
}
