import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton/BackButton";
import lock from "../../assets/icons/lock.svg";
import PinDots from "../../components/Signup/PinDots";
import Keypad from "../../components/Signup/Keypad";

const PIN_LENGTH = 4;

export default function GuardianPassword() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  // 임시 비밀번호
  const verifyPin = async (inputPin: string) => {
    return inputPin === "0000";
  };

  const handleNumber = async (num: string) => {
    if (pin.length >= PIN_LENGTH) return;

    const newPin = pin + num;
    setPin(newPin);
    setError(false);

    // 4자리를 다 입력하면 잠깐 보여준 뒤 확인
    if (newPin.length === PIN_LENGTH) {
      setTimeout(async () => {
        const isValid = await verifyPin(newPin);
        if (isValid) {
          navigate("/guardian");
        } else {
          setError(true);
          setPin("");
        }
      }, 300);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <main className="min-h-full w-full bg-[#FBFBFB] flex flex-col">
      <BackButton variant="close" />

      <div className="flex flex-col items-center gap-6 mt-[30px]">
        {/* 자물쇠 아이콘 */}
        <div className="w-20 h-20 bg-[#EEEAFF] rounded-[40px] flex justify-center items-center">
          <img src={lock} alt="" className="w-[42px] h-[42px]" />
        </div>
        <h1 className="text-2xl text-[#241F48] font-jua font-normal leading-9 text-center">
          보호자 비밀번호를
          <br />
          입력해 주세요
        </h1>
        <PinDots length={pin.length} total={PIN_LENGTH} />
        {error && (
          <p className="text-sm text-[#E5484D]">비밀번호가 맞지 않아요</p>
        )}
      </div>
      <button
        type="button"
        className="mt-[140px] text-base font-normal leading-6 font-jua text-[#D2C6AF]"
      >
        비밀번호를 잊으셨나요?
      </button>
      <div className="mt-[33px] pb-10 flex flex-col items-center gap-6 pr-6">
        <Keypad onNumber={handleNumber} onDelete={handleDelete} />
      </div>
    </main>
  );
}
