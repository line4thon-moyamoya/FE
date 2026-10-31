import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import moya from "../../assets/images/moya/default/moya_exciting.svg";

export default function Ready() {
  const navigate = useNavigate();
  const location = useLocation();
  const childName: string = location.state?.childName ?? "아이";
  return (
    <div className="flex flex-col items-center mt-[242px]">
      <img src={moya} className="w-[250px] h-[250px]" />
      <h1 className="text-4xl font-normal font-jua leading-10 text-[#241F48] mt-[22px]">
        준비 끝!
      </h1>
      <p className="mt-2 font-noto text-base leading-6 font-bold text-[#6F6A8C] mb-[164px]">
        이제 {childName}에게 휴대폰을 건네주세요.
      </p>
      <Button
        text="아이 모드 시작하기"
        showArrow
        onClick={() => navigate("/moya-select", { state: { childName } })}
      />
    </div>
  );
}
