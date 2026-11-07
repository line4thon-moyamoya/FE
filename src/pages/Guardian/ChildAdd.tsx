import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import Toast from "../../components/common/Toast/Toast";
import ChildProfileForm from "../../components/Guardian/ChildProfileForm";
import { addMockChild } from "../../mocks/guardian";
import type { AgeGroup } from "../../types/signup";
import type { MoyaLook } from "../../types/moya";
import GuardianPage from "../../layout/GuardianPage";

export default function ChildAdd() {
  const navigate = useNavigate();

  // 빈 값으로 시작
  const [name, setName] = useState("");
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [moyaLook, setMoyaLook] = useState<MoyaLook | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const trimmedName = name.trim();
  const canSave =
    trimmedName.length > 0 &&
    ageGroup !== null &&
    moyaLook !== null &&
    !isSaving;

  const goBack = () => {
    // 이전 기록이 있으면 뒤로, 주소로 바로 들어왔으면 설정으로
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate("/guardian/settings", { replace: true });
    }
  };

  const handleAdd = () => {
    if (!canSave || ageGroup === null || moyaLook === null) return;
    setIsSaving(true); // 토스트가 떠 있는 동안 중복 추가 방지
    addMockChild({ name: trimmedName, ageGroup, moyaLook });
    setToast("아이를 추가했어요");
    setTimeout(goBack, 1000); // 1초 보여 주고 설정으로
  };

  return (
    <GuardianPage title="아이 추가">
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
        <Button text="추가하기" onClick={handleAdd} />
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </GuardianPage>
  );
}
