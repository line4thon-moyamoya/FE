import type { StepProps } from "../../../types/signup";
import Input from "../../../components/common/Input/Input";
import Button from "../../../components/common/Button/Button";
import moya from "../../../assets/images/moya/default/moya_description.svg";
import AgeSelect from "../../../components/Signup/AgeSelect";

// 받침이 있으면 "아", 없으면 "야" (지우야 / 민준아)
const getCallName = (name: string) => {
  const lastChar = name.charCodeAt(name.length - 1);
  const isHangul = lastChar >= 0xac00 && lastChar <= 0xd7a3;
  const hasBatchim = isHangul && (lastChar - 0xac00) % 28 !== 0;
  return `${name}${hasBatchim ? "아" : "야"}`;
};

export default function ChildProfileStep({
  data,
  updateData,
  onNext,
}: StepProps) {
  const canNext = data.childName.trim() !== "" && data.childAge !== null;
  const childName = data.childName.trim();

  return (
    <div className="flex flex-col pl-6">
      <h1 className="mt-6 font-jua text-2xl leading-9 font-normal text-[#241F48]">
        아이 프로필을 만들어요
      </h1>

      <div className="mt-6 flex flex-col gap-4">
        <Input
          label="아이 별명"
          type="text"
          value={data.childName}
          onChange={(v) => updateData({ childName: v })}
          placeholder="아이 이름을 입력해주세요."
        />
        <AgeSelect
          value={data.childAge}
          onChange={(v) => updateData({ childAge: v })}
        />
      </div>

      {/* 모야 인사 미리보기 */}
      <div
        className={`mt-[36px] flex items-center gap-[10px] ${childName ? "" : "invisible"}`}
      >
        <img src={moya} alt="" className="h-18 w-18" />
        <p className="font-jua text-xl leading-7 font-normal text-[#241F48]">
          '{getCallName(childName)}, 안녕!'
        </p>
      </div>

      <div className="mt-[278px]">
        <Button text="다음" showArrow onClick={onNext} disabled={!canNext} />
      </div>
    </div>
  );
}
