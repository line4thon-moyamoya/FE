import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingSection from "../../components/Guardian/SettingSection";
import SettingItem from "../../components/Guardian/SettingItem";
import { AGE_GROUP_LABEL } from "../../types/signup";
import { MOYA_LOOK_INFO } from "../../constants/moyaLook";
import VoiceConsentWithdrawSheet from "../../components/Guardian/VoiceConsentWithdrawSheet";
import { setVoiceConsent } from "../../utils/voiceConsent";
import { getCurrentChildId } from "../../utils/currentChild";
import GuardianPage from "../../layout/GuardianPage";
import { logout } from "../../api/auth";
import {
  getSettings,
  updateVoiceConsent,
  type SettingsChild,
} from "../../api/user";

const getChildProfileLabel = (child: SettingsChild) => {
  const parts = [child.name, AGE_GROUP_LABEL[child.ageGroup]];
  if (child.moyaLook) parts.push(MOYA_LOOK_INFO[child.moyaLook].label);
  return parts.join(" · ");
};

// 상세 페이지가 생기기 전까지 쓰는 임시 안내
// 아직 없는 화면으로 가는 항목은 눌러도 아무 일도 일어나지 않음
const comingSoon = () => {};

export default function Settings() {
  const navigate = useNavigate();
  const [childList, setChildList] = useState<SettingsChild[]>([]);
  const [isVoiceAgreed, setIsVoiceAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [isWithdrawSheetOpen, setIsWithdrawSheetOpen] = useState(false);
  const isLoggingOutRef = useRef(false);

  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const isWithdrawingRef = useRef(false);

  useEffect(() => {
    let ignore = false;

    getSettings()
      .then((data) => {
        if (ignore) return;
        setChildList(data.children);
        setIsVoiceAgreed(data.voiceProcessingAgreed);
        setVoiceConsent(data.voiceProcessingAgreed); // 로컬 상태도 서버와 맞추기
      })
      .catch(() => {
        if (!ignore) setIsError(true);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  // 아이 모드 E-3(음성 동의 꺼짐) 화면으로 이동
  const goToVoiceConsentOff = () => {
    const childId = getCurrentChildId() ?? childList[0]?.id;
    navigate(childId ? `/children/${childId}/home` : "/guardian");
  };

  const handleWithdraw = async () => {
    if (isWithdrawingRef.current) return;
    isWithdrawingRef.current = true;
    setIsWithdrawing(true);

    try {
      await updateVoiceConsent(false);
      setVoiceConsent(false);
      setIsVoiceAgreed(false);
      setIsWithdrawSheetOpen(false);
      goToVoiceConsentOff();
    } catch (error) {
      console.error(error);
      alert("동의를 철회하지 못했어요. 다시 시도해 주세요.");
    } finally {
      isWithdrawingRef.current = false;
      setIsWithdrawing(false);
    }
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
          {isError && (
            <p className="px-1 text-sm text-[#8A84A8]">
              아이 정보를 불러오지 못했어요.
            </p>
          )}
          {!isLoading &&
            childList.map((child) => (
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
          {isVoiceAgreed ? (
            <SettingItem
              label="음성 수집 동의 철회"
              variant="danger"
              onClick={() => setIsWithdrawSheetOpen(true)}
            />
          ) : (
            <SettingItem
              label="음성 수집 다시 동의하기"
              variant="primary"
              onClick={goToVoiceConsentOff}
            />
          )}
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
        isWithdrawing={isWithdrawing}
      />
    </GuardianPage>
  );
}