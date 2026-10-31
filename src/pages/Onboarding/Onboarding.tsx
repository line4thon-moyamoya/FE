import title from "../../assets/images/moyamoya_title.svg";
import highlight from "../../assets/images/highlight.svg";
import moya from "../../assets/images/moya/default/moya_wave.svg";
import Button from "../../components/common/Button/Button";

import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <main className="relative h-full w-full flex flex-col items-center">
      <div className="absolute inset-x-0 bottom-0 h-[25%] bg-lavender">
        <svg
          className="absolute bottom-full left-0 block h-10 w-full"
          viewBox="0 0 402 40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 30
       C 15 35, 30 38, 45 38
       C 100 38, 150 18, 200 18
       C 225 18, 240 23, 260 23
       C 320 23, 370 10, 402 1
       L 402 40 L 0 40 Z"
            className="fill-lavender"
          />
        </svg>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        {/* 제목 + 밑줄 */}
        <div className="flex flex-col mt-[122px]">
          <img src={title} className="w-[212px] h-[49px]" />
          <img src={highlight} className="w-[108px] h-[11px] ml-25" />
        </div>
        <img src={moya} className="w-[390px] h-[410px] mt-6" />
        <p className="text-[#6F6A8C] text-base font-bold font-noto leading-7 mt-12 mb-3">
          모르는 말, 모야한테 물어봐!
        </p>
        <Button onClick={() => navigate("/signup")} text="시작하기" showArrow />
        <p
          onClick={() => navigate("/login")}
          className="text-[#9A96B3] text-base font-normal font-jua leading-6 mt-6 cursor-pointer"
        >
          이미 계정이 있어요
        </p>
      </div>
    </main>
  );
}
