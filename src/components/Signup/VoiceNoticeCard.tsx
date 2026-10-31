import voice from "../../assets/icons/voice.svg";
import lock from "../../assets/icons/lock.svg";
import settings from "../../assets/icons/settings.svg";

export default function VoiceNoticeCard() {
  return (
    <div className="w-[354px] h-50 bg-white p-[18px] rounded-3xl flex flex-col justify-start items-start gap-5">
      {/* 음성 */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-2xl bg-[#EEEAFF] flex justify-center items-center">
          <img src={voice} />
        </div>
        <p className="text-base font-bold font-noto leading-6 text-[#241F48]">
          아이 질문을 알아듣는 데에만 써요.
        </p>
      </div>
      {/* 잠금 */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-2xl bg-[#EEEAFF] flex justify-center items-center">
          <img src={lock} />
        </div>
        <p className="text-base font-bold font-noto leading-6 text-[#241F48]">
          알아들은 뒤 목소리는 바로 지워요.<br/>물어볼 단어 녹음만 7일 보관해요.
        </p>
      </div>
      {/* 설정 */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-2xl bg-[#EEEAFF] flex justify-center items-center">
          <img src={settings} />
        </div>
        <p className="text-base font-bold font-noto leading-6 text-[#241F48]">
          언제든 설정에서 기록을 지우거나<br/>동의를 철회할 수 있어요.
        </p>
      </div>
    </div>
  );
}
