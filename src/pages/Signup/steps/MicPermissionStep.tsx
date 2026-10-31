import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { StepProps } from "../../../types/signup";
import speaker from "../../../assets/icons/speaker.svg";
import moya from "../../../assets/images/moya/default/moya_wave.svg";
import voice from "../../../assets/icons/voice.svg";
import Button from "../../../components/common/Button/Button";

export default function MicPermissionStep({
  onNext,
}: Pick<StepProps, "onNext">) {
  const [denied, setDenied] = useState(false);
  const navigate = useNavigate();

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
      {/* 모야의 말풍선 */}
      <div
        className="relative flex h-25 w-[313px] items-center justify-start gap-3 rounded-3xl border-2 border-[#E0DDD7]
          bg-white py-[18px] pr-[30px] pl-5 shadow-[0px_4px_0px_0px_rgba(241,228,200,1)]"
      >
        <p className="text-center font-jua text-xl leading-8 font-normal text-[#241F48]">
          모야가 네 목소리를 들으려면
          <br />
          마이크가 필요해!
        </p>
        <div
          className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-2xl border-2 border-white
            bg-[#7B61F8] shadow-[0px_3px_8px_0px_rgba(106,79,243,0.28)]"
        >
          <img src={speaker} alt="" className="h-4 w-4" />
        </div>

        {/* 말풍선 꼬리 */}
        <div
          className="absolute -bottom-[11px] left-1/2 h-5 w-5 -translate-x-1/2 rotate-45
            border-r-2 border-b-2 border-[#E0DDD7] bg-white
            shadow-[3px_3px_0px_0px_rgba(241,228,200,1)]"
        />
      </div>

      <img src={moya} alt="손 흔드는 모야" className="h-60 w-60" />

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
        onClick={() => navigate("/ready")}
        className="font-jua text-base leading-6 font-normal text-[#9A96B3]"
      >
        나중에 할게요
      </button>
    </div>
  );
}
