import title from "../../assets/images/moyamoya-title.svg";
import highlight from "../../assets/images/highlight.svg";
import moya from "../../assets/images/moya/default/moya_greeting.webp";
import wondering from "../../assets/images/wondering.svg";
import music from "../../assets/images/music.svg";
import Button from "../../components/common/Button/Button";

import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <main className="relative h-full w-full flex flex-col items-center">
      <div className="fixed inset-x-0 bottom-0 h-[25%] bg-lavender">
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
      <div className="relative z-10 flex h-full w-full flex-col items-center">
        {/* 제목 + 밑줄 */}
        <div aria-hidden className="min-h-0 w-full flex-1 max-h-[122px]" />
        <div className="flex shrink-0 flex-col">
          <img src={title} className="w-[212px] h-[49px]" />
          <img src={highlight} className="w-[108px] h-[11px] ml-25" />
        </div>
        <div aria-hidden className="min-h-0 w-full flex-1 max-h-[24px]" />
        <div className="relative w-full max-w-[390px] shrink-0 aspect-[390/410]">
          <img src={moya} className="h-full w-full object-contain" />
          <img
            src={wondering}
            aria-hidden="true"
            className="absolute top-[23%] left-[2%] w-[100px] h-[100px]"
          />
          <img
            src={music}
            aria-hidden="true"
            className="absolute top-[45%] left-[82%] w-9 h-9"
          />
        </div>
        <div aria-hidden className="min-h-0 w-full flex-1 max-h-[68px]" />
        <p className="shrink-0 text-[#6F6A8C] text-base font-bold font-noto leading-7 mb-3">
          모르는 말, 모야한테 물어봐!
        </p>
        <Button onClick={() => navigate("/signup")} text="시작하기" showArrow />
        <div aria-hidden className="min-h-0 w-full flex-1 max-h-[24px]" />
        <p
          onClick={() => navigate("/login")}
          className="shrink-0 text-[#9A96B3] text-base font-normal font-jua leading-6 cursor-pointer"
        >
          이미 계정이 있어요
        </p>
      </div>
    </main>
  );
}
