import moyaConfused from "../../assets/images/moya/default/moya_confused.png";
import speaker from "../../assets/icons/speaker.svg";
import reset from "../../assets/icons/reset.svg";
import home from "../../assets/icons/home.svg";
import { speak } from "../../utils/speak";

const LINE = "앗, 모야 우주선 신호가 약해!\n다시 해 볼까?";

interface ConnectionLostProps {
  onRetry: () => void;
  onGoHome: () => void;
}

export default function ConnectionLost({ onRetry, onGoHome }: ConnectionLostProps) {
  return (
    <section
      role="alert"
      className="flex flex-1 min-h-0 flex-col items-center overflow-y-auto px-6 pt-[70px] pb-5"
    >
      {/* 모야 말풍선 */}
      <div className="relative flex w-[316px] h-25 items-center justify-center gap-4 rounded-3xl bg-white pl-5 py-[18px] pr-5 border-2 border-[#E0DDD7] shadow-[0px_4px_0px_0px_rgba(241,228,200,1.00)]">
        <p className="whitespace-pre-line text-center font-jua text-xl leading-8 text-[#241F48]">
          {LINE}
        </p>
        <button
          type="button"
          onClick={() => speak(LINE)}
          className="cursor-pointer flex w-[30px] h-[30px] items-center justify-center rounded-full bg-[#7B61F8] shadow-[0px_3px_8px_0px_rgba(106,79,243,0.28)] border-2 border-white"
        >
          <img src={speaker} className="w-4 h-4" />
        </button>
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-r-2 border-b-2 border-[#E0DDD7]" />
      </div>

      {/* 모야 */}
      <img src={moyaConfused} alt="" className="w-[220px] h-[220px] object-contain mt-6" />

      {/* 버튼 */}
      <div className="flex w-full flex-col gap-3 mt-auto pt-6">
        <button
          type="button"
          onClick={onRetry}
          className="cursor-pointer flex w-[354px] h-[60px] px-5 items-center justify-center gap-2 rounded-[20px] bg-[#7B61F8] font-jua text-xl font-normal leading-6 text-white shadow-[0px_5px_0px_0px_rgba(74,53,201,1.00)]"
        >
          <img src={reset} className="w-6 h-6" />
          다시 해 볼래
        </button>
        <button
          type="button"
          onClick={onGoHome}
          className="cursor-pointer flex w-[354px] h-[60px] items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-[#A08DFF] font-jua text-xl font-normal leading-6 text-[#6F6A8C]"
        >
          <img src={home} alt="" className="w-5 h-5" />
          처음으로
        </button>
      </div>
    </section>
  );
}