import BottomSheet from "../common/BottomSheet/BottomSheet";
import Button from "../common/Button/Button";
import mic from "../../assets/icons/mic_icon.svg";
import lock from "../../assets/icons/lock.svg";
import settings from "../../assets/icons/settings.svg";

interface VoiceConsentWithdrawSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: () => void;
}

const NOTICES = [
  { icon: mic, text: "모야가 아이 말을 들을 수 없어요." },
  { icon: lock, text: "단어 묻기, 노래 기능이 멈춰요." },
  {
    icon: settings,
    text: "계정은 그대로 남아요.\n언제든 다시 동의할 수 있어요.",
  },
];

export default function VoiceConsentWithdrawSheet({
  isOpen,
  onClose,
  onWithdraw,
}: VoiceConsentWithdrawSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <h2 className="font-jua text-xl leading-7 text-[#241F48]">
        음성 수집 동의를 철회할까요?
      </h2>

      <ul className="flex flex-col gap-[14px] mt-5 rounded-3xl bg-white p-[18px]">
        {NOTICES.map(({ icon, text }) => (
          <li key={text} className="flex items-start gap-[14px]">
            <span className="flex w-8 h-8 items-center justify-center rounded-full bg-[#EEEAFF]">
              <img src={icon} className="w-[18px] h-[18px]" />
            </span>
            <p className="whitespace-pre-line pt-1 font-noto text-base font-bold leading-6 text-[#241F48]">
              {text}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-4 mt-9">
        <Button text="계속 쓸게요" onClick={onClose} />
        <button
          type="button"
          onClick={onWithdraw}
          className="cursor-pointer w-[346px] h-[60px] rounded-[20px] px-5 border-2 border-dashed border-[#A08DFF] bg-white font-jua text-xl leading-6 text-[#6F6A8C]"
        >
          철회하기
        </button>
      </div>
    </BottomSheet>
  );
}
