import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import moya from "../../assets/images/moya/default/moya_excited.webp";

export default function Ready() {
  const navigate = useNavigate();
  const location = useLocation();
  const childName: string = location.state?.childName ?? "아이";
  return (
    <div className="flex h-full flex-col items-center">
      <div aria-hidden className="min-h-0 w-full flex-1 max-h-[242px]" />
      <img src={moya} className="h-[250px] w-[250px] shrink-0" />
      <h1 className="text-4xl font-normal font-jua leading-10 text-[#241F48] mt-[22px]">
        준비 끝!
      </h1>
      <p className="mt-2 font-noto text-base leading-6 font-bold text-[#6F6A8C] ">
        이제 {childName}에게 휴대폰을 건네주세요.
      </p>
      <div aria-hidden className="min-h-0 w-full flex-1 max-h-[164px]" />
      <Button
        text="아이 모드 시작하기"
        showArrow
        onClick={() => navigate("/moya-select", { state: { childName } })}
      />
    </div>
  );
}
