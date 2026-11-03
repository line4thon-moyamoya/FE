import Input from "../common/Input/Input";
import AgeSelect from "../Signup/AgeSelect";
import MoyaLookSelector from "./MoyaLookSelector";
import type { AgeGroup } from "../../types/signup";
import type { MoyaLook } from "../../types/moya";
import childProfile from "../../assets/images/child_profile.svg";

interface ChildProfileFormProps {
  name: string;
  onNameChange: (value: string) => void;
  ageGroup: AgeGroup | null;
  onAgeGroupChange: (value: AgeGroup) => void;
  moyaLook: MoyaLook | null;
  onMoyaLookChange: (value: MoyaLook) => void;
}

export default function ChildProfileForm({
  name,
  onNameChange,
  ageGroup,
  onAgeGroupChange,
  moyaLook,
  onMoyaLookChange,
}: ChildProfileFormProps) {
  return (
    <div className="flex flex-col items-center gap-6">
        <img src={childProfile} alt="" className="w-22 h-22" />

      <Input
        label="아이 별명"
        value={name}
        onChange={onNameChange}
        placeholder="별명을 적어 주세요"
      />
      <AgeSelect value={ageGroup} onChange={onAgeGroupChange} />
      <MoyaLookSelector value={moyaLook} onChange={onMoyaLookChange} />
    </div>
  );
}
