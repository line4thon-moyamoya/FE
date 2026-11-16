import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton/BackButton";
import lock from "../../assets/icons/lock.svg";
import PinDots from "../../components/Signup/PinDots";
import Keypad from "../../components/Signup/Keypad";
import { verifyParentPin } from "../../api/auth";

const PIN_LENGTH = 4;

export default function GuardianPassword() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  // 틀릴 때마다 올려서 흔들림을 다시 재생시킴
  const [wrongCount, setWrongCount] = useState(0);
  const isWrong = wrongCount > 0;
  // 확인 중에는 입력 막기
  const isVerifyingRef = useRef(false);

  // PIN 인증 API 호출
  const verifyPin = async (inputPin: string) => {
    try {
      await verifyParentPin(inputPin);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleNumber = (num: string) => {
    if (isVerifyingRef.current) return;
    if (pin.length >= PIN_LENGTH) return;

    const newPin = pin + num;
    setPin(newPin);
    setWrongCount(0);

    // 4자리를 다 입력하면 잠깐 보여준 뒤 확인
    if (newPin.length === PIN_LENGTH) {
      isVerifyingRef.current = true;

      setTimeout(async () => {
        const isValid = await verifyPin(newPin);
        isVerifyingRef.current = false;

        if (isValid) {
          navigate("/guardian");
        } else {
          setWrongCount((count) => count + 1);
          setPin("");
        }
      }, 300);
    }
  };

  const handleDelete = () => {
    if (isVerifyingRef.current) return;
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <main className="pt-status flex h-full w-full flex-col bg-guardian">
      <div className="flex pl-6 pt-1.5">
        <BackButton variant="close" />
      </div>

      <div aria-hidden className="min-h-0 w-full flex-1 max-h-[30px]" />
      <div className="flex shrink-0 flex-col items-center gap-6">
        {/* 자물쇠 아이콘 */}
        <div className="w-20 h-20 bg-[#EEEAFF] rounded-[40px] flex justify-center items-center">
          <img src={lock} alt="" className="w-[42px] h-[42px]" />
        </div>
        <h1 className="text-2xl text-[#241F48] font-jua font-normal leading-9 text-center">
          보호자 비밀번호를
          <br />
          {/* 틀리면 아랫줄만 바뀌면서 색이 들어감 */}
          {isWrong ? (
            <span className="text-brand-action">다시 확인해주세요</span>
          ) : (
            "입력해 주세요"
          )}
        </h1>

        {/* key 가 바뀌어야 흔들림이 매번 다시 재생됨 */}
        <div key={wrongCount} className={isWrong ? "animate-shake" : undefined}>
          <PinDots length={pin.length} total={PIN_LENGTH} />
        </div>
      </div>
      <div aria-hidden className="min-h-0 w-full flex-1 max-h-[140px]" />
      <button
        type="button"
        className="shrink-0 text-base font-normal leading-6 font-jua text-[#D2C6AF]"
      >
        비밀번호를 잊으셨나요?
      </button>
      <div aria-hidden className="min-h-0 w-full flex-1 max-h-[33px]" />
      <div className="flex shrink-0 flex-col items-center gap-6 px-6 pb-10">
        <Keypad onNumber={handleNumber} onDelete={handleDelete} />
      </div>
    </main>
  );
}
