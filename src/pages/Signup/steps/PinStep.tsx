import type { StepProps } from "../../../types/signup";
import lock from "../../../assets/icons/lock.svg";
import PinDots from "../../../components/Signup/PinDots";
import Keypad from "../../../components/Signup/Keypad";

const PIN_LENGTH = 4;

export default function PinStep({ data, updateData, onNext }: StepProps) {
  const handleNumber = (num: string) => {
    if (data.pin.length >= PIN_LENGTH) return;

    const newPin = data.pin + num;
    updateData({ pin: newPin });

    // 4자리를 다 입력하면 잠깐 보여준 뒤 다음 단계로 이동
    if (newPin.length === PIN_LENGTH) {
      setTimeout(onNext, 300);
    }
  };

  const handleDelete = () => {
    updateData({ pin: data.pin.slice(0, -1) });
  };

  return (
    <div className="flex flex-col pr-6">
      <div className="mt-6 flex flex-col items-center gap-6">
        <div className="flex h-18 w-18 items-center justify-center rounded-[36px] bg-[#EEEAFF]">
          <img src={lock} alt="" className="h-[38px] w-[38px]" />
        </div>
        <h1 className="text-center font-jua text-2xl leading-9 font-normal text-[#241F48]">
          아이 모드를 잠글
          <br />
          비밀번호 4자리를 정해 주세요
        </h1>
        <PinDots length={data.pin.length} total={PIN_LENGTH} />
      </div>
      <div className="mt-[186px]">
        <Keypad onNumber={handleNumber} onDelete={handleDelete} />
      </div>
    </div>
  );
}
