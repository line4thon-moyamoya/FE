import moyaConfused from "../../assets/images/moya/default/moya_confused.png";
import speaker from "../../assets/icons/speaker.svg";
import reset from "../../assets/icons/reset_white.svg";
import lock from "../../assets/icons/lock.svg";
import { speak } from "../../utils/speak";

const LINE = "마이크가 꺼져 있어서\n네 목소리가 안 들려!";

const GUIDE_STEPS = [
  "설정 앱을 열어요",
  "Safari → 마이크를 눌러요",
  "‘허용’으로 바꿔요",
];

interface MicPermissionOffProps {
  onRetry: () => void;
  onAskGuardian: () => void;
}

export default function MicPermissionOff({ onRetry, onAskGuardian }: MicPermissionOffProps) {
  return (
    <section
      role="alert"
      className="flex flex-1 min-h-0 flex-col items-center gap-[22px] overflow-y-auto px-6 pt-[18px] pb-5"
    >
      {/* 모야 말풍선 */}
      <div className="relative flex w-[270px] h-25 items-center justify-center gap-6 rounded-3xl bg-white pl-5 py-[18px] pr-[30px] border-2 border-[#E0DDD7] shadow-[0px_4px_0px_0px_rgba(241,228,200,1.00)]">
        <p className="whitespace-pre-line text-center font-jua text-xl leading-8 text-[#241F48]">
          {LINE}
        </p>
        <button
          type="button"
          onClick={() => speak(LINE)}
          aria-label="모야 말 듣기"
          className="cursor-pointer flex shrink-0 w-[30px] h-[30px] items-center justify-center rounded-full bg-[#7B61F8] shadow-[0px_3px_8px_0px_rgba(106,79,243,0.28)] border-2 border-white"
        >
          <img src={speaker} alt="" className="w-4 h-4" />
        </button>
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-r-2 border-b-2 border-[#E0DDD7]" />
      </div>

      {/* 모야 */}
      <img src={moyaConfused} alt="" className="w-40 h-40 object-contain" />

      {/* 보호자 안내 */}
      <div className="flex w-full flex-col items-start gap-2 px-6">
        <p className="font-jua text-base font-normal leading-6 text-[#241F48]">
          보호자님, 이렇게 켜 주세요
        </p>
        <ol className="flex flex-col gap-2">
          {GUIDE_STEPS.map((step, index) => (
            <li key={step} className="font-noto text-sm font-bold leading-5 text-[#6F6A8C]">
              {index + 1}. {step}
            </li>
          ))}
        </ol>
      </div>

      {/* 버튼 */}
      <div className="flex w-full flex-col gap-3 mt-auto">
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
          onClick={onAskGuardian}
          className="cursor-pointer flex w-[354px] h-[60px] items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-[#A08DFF] font-jua text-xl font-normal leading-6 text-[#6F6A8C]"
        >
          <img src={lock} alt="" className="w-6 h-6" />
          보호자에게 도움 요청
        </button>
      </div>
    </section>
  );
}