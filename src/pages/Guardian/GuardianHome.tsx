import { useState } from "react";
import { useNavigate } from "react-router-dom";
import settings from "../../assets/icons/settings.svg";
import ChildTab from "../../components/Guardian/ChildTab";
import { MOCK_CHILD_LIST } from "../../mocks/guardian";
import WeeklySummaryCard from "../../components/Guardian/WeeklySummaryCard";
import MissingWordCard from "../../components/Guardian/MissingWordCard";
import FreeTrialCard from "../../components/Guardian/FreeTrialCard";
import Button from "../../components/common/Button/Button";
import { setCurrentChildId } from "../../utils/currentChild";

export default function GuardianHome() {
  const navigate = useNavigate();
  const childList = MOCK_CHILD_LIST;
  const [selectedId, setSelectedId] = useState(childList[0].id);
  const selectedChild = childList.find((c) => c.id === selectedId)!;

  const goToChildMode = () => {
    setCurrentChildId(selectedChild.id);
    navigate("/home");
  };

  return (
    <main className="min-h-full w-full bg-[#FBFBFB] flex flex-col px-6">
      <header className="flex justify-between items-center w-full py-[10px] mt-[50px] mb-[18px]">
        <h1 className="text-[#241F48] text-2xl font-normal font-jua leading-9">
          보호자님
        </h1>
        <button
          onClick={() => navigate("/settings")}
          className="cursor-pointer w-11 h-11 bg-white rounded-3xl shadow-[0px_4px_0px_0px_rgba(231,228,243,1.00)] border-2 border-[#EFE6D3] flex justify-center items-center"
        >
          <img src={settings} className="w-[26px] h-[26px]" />
        </button>
      </header>
      <div className="flex flex-col gap-4 mb-[154px]">
        <ChildTab
          childList={childList}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <WeeklySummaryCard
          childName={selectedChild.name}
          summary={selectedChild.weeklySummary}
          onReportClick={() => navigate("/guardian/report")}
        />
        <MissingWordCard
          missingWords={selectedChild.missingWords}
          onClick={() => navigate("/guardian/missing-words")}
        />
        <FreeTrialCard
          freeTrial={selectedChild.freeTrial}
          onSubscribeClick={() => alert("구독 기능은 준비 중이에요")}
        />
      </div>
      <Button
        text={`${selectedChild.name} 아이 모드로 가기`}
        showArrow
        onClick={goToChildMode}
      />
    </main>
  );
}
