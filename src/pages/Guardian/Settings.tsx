import { useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton/BackButton";
import SettingSection from "../../components/Guardian/SettingSection";
import SettingItem from "../../components/Guardian/SettingItem";
import { MOCK_CHILD_LIST } from "../../mocks/guardian";
import type { Child } from "../../types/guardian";
import { AGE_GROUP_LABEL } from "../../types/signup";
import { MOYA_LOOK_LABEL } from "../../types/moya";

const getChildProfileLabel = (child: Child) => {
  const parts = [child.name, AGE_GROUP_LABEL[child.ageGroup]];
  if (child.moyaLook) parts.push(MOYA_LOOK_LABEL[child.moyaLook]);
  return parts.join(" · ");
};

// 상세 페이지가 생기기 전까지 쓰는 임시 안내
const comingSoon = () => alert("준비 중인 기능이에요");

export default function Settings() {
  const navigate = useNavigate();
  const childList = MOCK_CHILD_LIST; // TODO: API 연동 시 교체

  return (
    <main className="min-h-full w-full bg-[#FBFBFB] flex flex-col">
      <header className="flex gap-2.5 items-center">
        <BackButton />
        <h1 className="font-jua leading-7 font-normal text-xl text-[#241F48] mt-[73px]">
          설정
        </h1>
      </header>

      <div className="flex flex-col gap-6 px-6 pt-[18px] pb-10">
        <SettingSection title="아이 프로필">
          {childList.map((child) => (
            <SettingItem
              key={child.id}
              label={getChildProfileLabel(child)}
              onClick={() => navigate(`/guardian/settings/child/${child.id}`)}
            />
          ))}
          <SettingItem label="+ 아이 추가하기" variant="primary" onClick={() => navigate("/guardian/settings/child/new")} />
        </SettingSection>

        <SettingSection
          title="목소리 · 개인정보"
          description="아이 목소리는 알아들은 뒤 바로 지우고, 물어볼 단어 녹음만 7일 동안 보관해요."
        >
          <SettingItem label="음성 기록 삭제" onClick={comingSoon} />
          <SettingItem label="음성 수집 동의 철회" variant="danger" onClick={comingSoon} />
        </SettingSection>

        <SettingSection title="계정">
          <SettingItem label="보호자 비밀번호 변경" onClick={comingSoon} />
          <SettingItem
            label="구독 관리"
            onClick={() => alert("구독 기능은 준비 중이에요")}
          />
          <SettingItem label="로그아웃" onClick={comingSoon} />
          <SettingItem label="회원 탈퇴" variant="muted" onClick={comingSoon} />
        </SettingSection>
      </div>
    </main>
  );
}