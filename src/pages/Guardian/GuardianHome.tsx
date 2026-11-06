import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const childList = MOCK_CHILD_LIST;

  // URL의 ?child= 값으로 선택한 아이를 정함 (없거나 잘못된 값이면 첫 번째 아이)
  const childParam = Number(searchParams.get("child"));
  const selectedChild =
    childList.find((c) => c.id === childParam) ?? childList[0];

  const handleSelectChild = (id: number) => {
    // replace: 아이를 바꿀 때마다 뒤로가기 기록이 쌓이지 않도록
    setSearchParams({ child: String(id) }, { replace: true });
  };

  const goToChildMode = () => {
    setCurrentChildId(selectedChild.id);
    navigate("/home");
  };

  return (
    <main className="pt-status flex min-h-full w-full flex-col bg-guardian">
      <header className="flex w-full items-center justify-between px-6 py-2.5">
        <h1 className="font-jua text-[26px] leading-[1.35] font-normal text-ink">
          보호자님
        </h1>
        <button
          type="button"
          aria-label="설정"
          onClick={() => navigate("/guardian/settings")}
          className="cursor-pointer w-11 h-11 bg-white rounded-3xl shadow-[0px_4px_0px_0px_rgba(231,228,243,1.00)] border-2 border-[#EFE6D3] flex justify-center items-center"
        >
          <img src={settings} alt="" className="w-[26px] h-[26px]" />
        </button>
      </header>
      <div className="flex flex-1 flex-col gap-4 px-6 pt-[18px] pb-3">
        <ChildTab
          childList={childList}
          selectedId={selectedChild.id}
          onSelect={handleSelectChild}
        />
        <WeeklySummaryCard
          childName={selectedChild.name}
          summary={selectedChild.weeklySummary}
          onReportClick={() => navigate(`/guardian/report/${selectedChild.id}`)}
        />
        <MissingWordCard
          missingWords={selectedChild.missingWords}
          onClick={() =>
            navigate(`/guardian/missing-words/${selectedChild.id}`)
          }
        />
        <FreeTrialCard
          freeTrial={selectedChild.freeTrial}
        />
      </div>
      {/* 하단 패널 */}
      <div className="px-6 pt-3 pb-14">
        <Button
          text={`${selectedChild.name} 아이 모드로 가기`}
          showArrow
          fullWidth
          onClick={goToChildMode}
        />
      </div>
    </main>
  );
}
