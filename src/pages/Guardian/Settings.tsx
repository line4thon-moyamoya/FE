import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingSection from "../../components/Guardian/SettingSection";
import SettingItem from "../../components/Guardian/SettingItem";
import { MOCK_CHILD_LIST } from "../../mocks/guardian";
import type { Child } from "../../types/guardian";
import { AGE_GROUP_LABEL } from "../../types/signup";
import { MOYA_LOOK_INFO } from "../../constants/moyaLook";
import VoiceConsentWithdrawSheet from "../../components/Guardian/VoiceConsentWithdrawSheet";
import { setVoiceConsent } from "../../utils/voiceConsent";
import GuardianPage from "../../layout/GuardianPage";
import { logout } from "../../api/auth";

const getChildProfileLabel = (child: Child) => {
  const parts = [child.name, AGE_GROUP_LABEL[child.ageGroup]];
  if (child.moyaLook) parts.push(MOYA_LOOK_INFO[child.moyaLook].label);
  return parts.join(" · ");
};

// 상세 페이지가 생기기 전까지 쓰는 임시 안내
// 아직 없는 화면으로 가는 항목은 눌러도 아무 일도 일어나지 않음
const comingSoon = () => {};

export default function Settings() {
  const navigate = useNavigate();
  const childList = MOCK_CHILD_LIST; // API 연동 시 교체

  const [isWithdrawSheetOpen, setIsWithdrawSheetOpen] = useState(false);
  const isLoggingOutRef = useRef(false);

  const handleWithdraw = () => {
    setVoiceConsent(false);
    setIsWithdrawSheetOpen(false);
    navigate("/guardian");
  };

  const handleLogout = async () => {
    if (isLoggingOutRef.current) return;
    isLoggingOutRef.current = true;

    try {
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/", { replace: true });
    }
  };

  return (
    <GuardianPage title="설정">
      <div className="flex flex-col gap-6 px-6 pt-[18px] pb-4">
        <SettingSection title="아이 프로필">
          {childList.map((child) => (
            <SettingItem
              key={child.id}
              label={getChildProfileLabel(child)}
              onClick={() => navigate(`/guardian/settings/child/${child.id}`)}
            />
          ))}
          <SettingItem
            label="+ 아이 추가하기"
            variant="primary"
            onClick={() => navigate("/guardian/settings/child/new")}
          />
        </SettingSection>

        <SettingSection
          title="목소리 · 개인정보"
          description="아이 목소리는 알아들은 뒤 바로 지우고, 물어볼 단어 녹음만 7일 동안 보관해요."
        >
          <SettingItem label="음성 기록 삭제" onClick={comingSoon} />
          <SettingItem
            label="음성 수집 동의 철회"
            variant="danger"
            onClick={() => setIsWithdrawSheetOpen(true)}
          />
        </SettingSection>

        <SettingSection title="계정">
          <SettingItem label="보호자 비밀번호 변경" onClick={comingSoon} />
          <SettingItem label="구독 관리" onClick={comingSoon} />
          <SettingItem label="로그아웃" onClick={handleLogout} />
          <SettingItem label="회원 탈퇴" variant="muted" onClick={comingSoon} />
        </SettingSection>
      </div>
      <VoiceConsentWithdrawSheet
        isOpen={isWithdrawSheetOpen}
        onClose={() => setIsWithdrawSheetOpen(false)}
        onWithdraw={handleWithdraw}
      />
    </GuardianPage>
  );
}