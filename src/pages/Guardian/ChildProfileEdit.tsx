import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/common/BackButton/BackButton";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import Toast from "../../components/common/Toast/Toast";
import AgeSelect from "../../components/Signup/AgeSelect";
import MoyaLookSelector from "../../components/Guardian/MoyaLookSelector";
import { MOCK_CHILD_LIST, updateMockChild } from "../../mocks/guardian";
import type { AgeGroup } from "../../types/signup";
import type { MoyaLook } from "../../types/moya";
import childProfile from "../../assets/images/child_profile.svg";

export default function ChildProfileEdit() {
  const navigate = useNavigate();
  const { childId } = useParams();
  const child = MOCK_CHILD_LIST.find((c) => c.id === Number(childId));

  // 저장된 값으로 초기화
  const [name, setName] = useState(child?.name ?? "");
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(
    child?.ageGroup ?? null,
  );
  const [moyaLook, setMoyaLook] = useState<MoyaLook | null>(
    child?.moyaLook ?? null,
  );
  const [toast, setToast] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 없는 아이 id로 들어오면 설정으로
  if (!child) return <Navigate to="/guardian/settings" replace />;

  const trimmedName = name.trim();
  const canSave = trimmedName.length > 0 && ageGroup !== null && !isSaving;

  const goBack = () => {
    // 이전 기록이 있으면 뒤로, 주소로 바로 들어왔으면 설정으로
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate("/guardian/settings", { replace: true });
    }
  };

  const handleSave = () => {
    if (!canSave) return;
    setIsSaving(true); // 토스트가 떠 있는 동안 중복 저장 방지
    updateMockChild(child.id, { name: trimmedName, ageGroup, moyaLook });
    setToast("저장되었어요");
    setTimeout(goBack, 1000); // 1초 보여 주고 설정으로
  };

  return (
    <main className="min-h-full w-full bg-[#FBFBFB] flex flex-col">
      <header className="flex gap-2.5 items-center">
        <BackButton />
        <h1 className="font-jua leading-7 font-normal text-xl text-[#241F48] mt-[73px]">
          아이 프로필
        </h1>
      </header>

      <div className="flex flex-1 flex-col items-center gap-6 px-6 pt-6">
        <div className="flex w-[88px] h-[88px] items-center justify-center rounded-full bg-[#EEEAFF]">
          <img src={childProfile} alt="" className="w-14 h-14" />
        </div>

        <Input
          label="아이 별명"
          value={name}
          onChange={setName}
          placeholder="아이 별명을 입력해 주세요"
        />
        <AgeSelect value={ageGroup} onChange={setAgeGroup} />
        <MoyaLookSelector value={moyaLook} onChange={setMoyaLook} />
      </div>

      <div className="px-6 pt-6 pb-10 mt-auto">
        <Button text="저장하기" onClick={handleSave} />
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </main>
  );
}
