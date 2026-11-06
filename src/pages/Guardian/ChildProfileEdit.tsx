import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton/BackButton";
import Button from "../../components/common/Button/Button";
import Toast from "../../components/common/Toast/Toast";
import ChildProfileForm from "../../components/Guardian/ChildProfileForm";
import { updateMockChild } from "../../mocks/guardian";
import type { AgeGroup } from "../../types/signup";
import type { MoyaLook } from "../../types/moya";
import useChildByParam from "../../hooks/useChildByParam";

export default function ChildProfileEdit() {
  const navigate = useNavigate();
  const { child, redirect } = useChildByParam("/guardian/settings");

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

  if (redirect) return redirect;

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
    if (!canSave || ageGroup === null) return;
    setIsSaving(true); // 중복 저장 방지
    updateMockChild(child.id, { name: trimmedName, ageGroup, moyaLook });
    setToast("저장되었어요");
    setTimeout(goBack, 1000); // 1초 보여 주고 설정으로 이동
  };

  return (
    <main className="min-h-full w-full bg-[#FBFBFB] flex flex-col">
      <header className="flex gap-2.5 items-center pl-6 pt-12">
        <BackButton />
        <h1 className="font-jua leading-7 font-normal text-xl text-[#241F48]">
          아이 프로필
        </h1>
      </header>

      <div className="flex flex-1 flex-col px-6 pt-6">
        <ChildProfileForm
          name={name}
          onNameChange={setName}
          ageGroup={ageGroup}
          onAgeGroupChange={setAgeGroup}
          moyaLook={moyaLook}
          onMoyaLookChange={setMoyaLook}
        />
      </div>

      <div className="px-6 pt-6 pb-10 mt-auto">
        <Button text="저장하기" onClick={handleSave} />
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </main>
  );
}
