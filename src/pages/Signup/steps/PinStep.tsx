import type { StepProps } from "../../../types/signup";
import lock from "../../../assets/icons/lock.svg";
import PinDots from "../../../components/Signup/PinDots";
import Keypad from "../../../components/Signup/Keypad";

const PIN_LENGTH = 4;

interface PinStepProps extends StepProps {
  /** 가입에 실패했을 때 보여 줄 문구 */
  error?: string | null;
  /** 다시 입력하기 시작하면 문구를 지운다 */
  onClearError?: () => void;
}

export default function PinStep({
  data,
  updateData,
  onNext,
  error,
  onClearError,
}: PinStepProps) {
  const handleNumber = (num: string) => {
    if (data.pin.length >= PIN_LENGTH) return;

    onClearError?.();
    const newPin = data.pin + num;
    updateData({ pin: newPin });

    // 4자리를 다 입력하면 잠깐 보여준 뒤 다음 단계로 이동
    if (newPin.length === PIN_LENGTH) {
      setTimeout(onNext, 300);
    }
  };

  const handleDelete = () => {
    onClearError?.();
    updateData({ pin: data.pin.slice(0, -1) });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col px-6">
      <div className="mt-6 flex flex-col items-center gap-6">
        <div className="flex h-18 w-18 items-center justify-center rounded-[36px] bg-[#EEEAFF]">
          <img src={lock} alt="" className="h-[38px] w-[38px]" />
        </div>
        <h1 className="text-center font-jua text-2xl leading-9 font-normal text-[#241F48]">
          아이 모드를 잠글
          <br />
          비밀번호 4자리를 정해 주세요
        </h1>

        {/* key 가 바뀌어야 흔들림이 매번 다시 재생됨 */}
        <div key={error ?? ""} className={error ? "animate-shake" : undefined}>
          <PinDots length={data.pin.length} total={PIN_LENGTH} />
        </div>

        {error && (
          <p className="text-center font-jua text-base leading-6 font-normal text-brand-action">
            {error}
          </p>
        )}
      </div>
      <div aria-hidden className="min-h-0 w-full flex-1 max-h-[186px]" />
      <div className="shrink-0 pb-10">
        <Keypad onNumber={handleNumber} onDelete={handleDelete} />
      </div>
    </div>
  );
}
