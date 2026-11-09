import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../components/common/Button/Button";
import Toast from "../../components/common/Toast/Toast";
import ChildProfileForm from "../../components/Guardian/ChildProfileForm";
import type { AgeGroup } from "../../types/signup";
import type { MoyaLook } from "../../types/moya";
import GuardianPage from "../../layout/GuardianPage";
import { getSettings, type SettingsChild } from "../../api/user";
import { updateChild } from "../../api/child";

export default function ChildProfileEdit() {
  const navigate = useNavigate();
  const { childId } = useParams(); 
  const id = Number(childId);

  const [original, setOriginal] = useState<SettingsChild | null>(null);
  const [name, setName] = useState("");
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [moyaLook, setMoyaLook] = useState<MoyaLook | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const isSavingRef = useRef(false);

  // 기존 아이 정보 불러오기
  useEffect(() => {
    let ignore = false;

    getSettings()
      .then((data) => {
        if (ignore) return;
        const child = data.children.find((c) => c.id === id);
        if (!child) {
          navigate("/guardian/settings", { replace: true });
          return;
        }
        setOriginal(child);
        setName(child.name);
        setAgeGroup(child.ageGroup);
        setMoyaLook(child.moyaLook);
      })
      .catch(() => {
        if (!ignore) setToast("아이 정보를 불러오지 못했어요.");
      });

    return () => {
      ignore = true;
    };
  }, [id, navigate]);

  const goBack = () => {
    // 이전 기록이 있으면 뒤로, 주소로 바로 들어왔으면 설정으로
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate("/guardian/settings", { replace: true });
    }
  };

  const trimmedName = name.trim();

  // 원래 값과 달라진 필드만 모으기
  const changes = original
    ? {
        ...(trimmedName !== original.name && { nickname: trimmedName }),
        ...(ageGroup && ageGroup !== original.ageGroup && { ageGroup }),
        ...(moyaLook && moyaLook !== original.moyaLook && { moyaLook }),
      }
    : {};
  const hasChanges = Object.keys(changes).length > 0;

  const canSave =
    original !== null &&
    trimmedName.length > 0 &&
    ageGroup !== null &&
    hasChanges &&
    !isSaving;

  const handleSave = async () => {
    if (!canSave || isSavingRef.current) return;

    isSavingRef.current = true;
    setIsSaving(true);

    try {
      await updateChild(id, changes);
      setToast("저장되었어요");
      setTimeout(goBack, 1000); // 1초 보여 주고 설정으로 이동
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : null;
      setToast(message ?? "저장하지 못했어요. 다시 시도해 주세요.");
      isSavingRef.current = false;
      setIsSaving(false);
    }
  };

  return (
    <GuardianPage title="아이 프로필">
      <div className="flex flex-1 flex-col px-6 pt-6">
        {original && (
          <ChildProfileForm
            name={name}
            onNameChange={setName}
            ageGroup={ageGroup}
            onAgeGroupChange={setAgeGroup}
            moyaLook={moyaLook}
            onMoyaLookChange={setMoyaLook}
          />
        )}
      </div>

      <div className="px-6 pt-6 pb-10 mt-auto">
        <Button text="저장하기" onClick={handleSave} />
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </GuardianPage>
  );
}