import moyaConfused from "../../assets/images/moya/default/moya_confused.png";
import speaker from "../../assets/icons/speaker.svg";
import check from "../../assets/icons/check_icon.svg";

const LINE = "지금은 모야가\n네 목소리를 못 들어!";

interface VoiceConsentOffProps {
  onAgreeAgain: () => void;
}

export default function VoiceConsentOff({
  onAgreeAgain,
}: VoiceConsentOffProps) {
  // 말풍선 문장을 읽어 주기 (브라우저 음성 합성)
  const handleSpeak = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(LINE.replace("\n", " "));
    utterance.lang = "ko-KR";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="flex flex-1 flex-col items-center px-6 pt-10 gap-[22px]">
      {/* 모야 말풍선 */}
      <div className="relative flex w-[270px] h-25 items-center justify-center gap-6 rounded-3xl bg-white pl-5 py-[18px] pr-[30px] border-2 border-[#E0DDD7] shadow-[0px_4px_0px_0px_rgba(241,228,200,1.00)]">
        <p className="whitespace-pre-line text-center font-jua text-xl leading-8 text-[#241F48]">
          {LINE}
        </p>
        <button
          type="button"
          onClick={handleSpeak}
          className="cursor-pointer w-[30px] h-[30px] flex items-center justify-center rounded-full bg-[#7B61F8] shadow-[0px_3px_8px_0px_rgba(106,79,243,0.28)] border-2 border-white"
        >
          <img src={speaker} className="w-4 h-4" />
        </button>
        {/* 말풍선 꼬리 */}
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-r-2 border-b-2 border-[#EFE6D3]" />
      </div>

      {/* 당황한 모야 */}
      <img
        src={moyaConfused}
        alt=""
        className="w-40 h-40 object-contain mt-4"
      />

      {/* 보호자 안내 */}
      <div className="flex flex-col items-start gap-2 mt-4 text-left">
        <p className="font-jua text-xl leading-8 font-normal text-[#241F48]">
          보호자님, 음성 수집 동의가 꺼져 있어요
        </p>
        <p className="font-noto text-sm font-bold leading-5 text-[#6F6A8C]">
          다시 동의하면 모야와 바로 이야기할 수 있어요.
          <br />그 전에는 화면만 둘러볼 수 있어요.
        </p>
      </div>

      <button
        type="button"
        onClick={onAgreeAgain}
        className="cursor-pointer flex w-full h-[60px] items-center justify-center gap-2 mt-[38px] rounded-[20px] bg-[#7B61F8] font-jua text-lg text-white shadow-[0px_4px_0px_0px_rgba(74,53,201,1.00)]"
      >
        <img src={check} alt="" className="w-5 h-5" />
        다시 동의하기
      </button>
    </section>
  );
}
