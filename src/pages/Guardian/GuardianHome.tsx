import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import settings from "../../assets/icons/settings.svg";
import ChildTab from "../../components/Guardian/ChildTab";
import WeeklySummaryCard from "../../components/Guardian/WeeklySummaryCard";
import MissingWordCard from "../../components/Guardian/MissingWordCard";
import FreeTrialCard from "../../components/Guardian/FreeTrialCard";
import Button from "../../components/common/Button/Button";
import {
  getGuardianHome,
  updateSelectedChild,
  type GuardianHomeData,
} from "../../api/guardian";

const FREE_TRIAL_PLACEHOLDER = { used: 12, total: 20 };

export default function GuardianHome() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [home, setHome] = useState<GuardianHomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const childParam = Number(searchParams.get("child")) || undefined;

  const latestSelectRef = useRef(0); // 마지막으로 누른 아이만 반영

  const handleSelectChild = async (id: number) => {
    if (id === home?.selectedChildId) return; // 같은 아이면 무시
    latestSelectRef.current = id;

    try {
      await updateSelectedChild(id);
      if (latestSelectRef.current !== id) return; // 그 사이 다른 아이를 눌렀으면 무시

      localStorage.setItem("childId", String(id));
      // replace: 아이를 바꿀 때마다 뒤로가기 기록이 쌓이지 않도록
      setSearchParams({ child: String(id) }, { replace: true });
    } catch (error) {
      console.error(error);
      alert("아이를 바꾸지 못했어요. 다시 시도해 주세요.");
    }
  };

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    setIsError(false);

    getGuardianHome(childParam)
      .then((data) => {
        if (ignore) return;
        setHome(data);
        localStorage.setItem("childId", String(data.selectedChildId));
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
  }, [childParam]);

  if (isLoading && !home) {
    return <main className="pt-status min-h-full bg-guardian" />;
  }

  if (isError || !home) {
    return (
      <main className="pt-status flex min-h-full flex-col items-center justify-center gap-4 bg-guardian">
        <p className="font-jua text-ink">정보를 불러오지 못했어요.</p>
        <Button text="다시 시도" onClick={() => window.location.reload()} />
      </main>
    );
  }

  // 서버 응답 → 기존 컴포넌트 형식
  const childList = home.children.map((c) => ({ id: c.childId, name: c.name }));
  const selectedId = home.selectedChildId;
  const summary = {
    askedCount: home.questionCount,
    missingCount: home.unrecognizedCount,
    reviewedCount: home.questionCount - home.unrecognizedCount, // 확인 필요
  };
  const missingWords = home.pendingRequestPreview.map((w) => ({
    id: w.wordRequestId,
    heardText: w.recognizedText,
    askedAt: "",
    audioUrl: "",
    correctedText: null,
  }));

  // 고른 아이 id 를 주소에 실어 아이 모드로 보냄
  const goToChildMode = () => navigate(`/children/${selectedId}/home`);

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
          selectedId={selectedId}
          onSelect={handleSelectChild}
        />
        <WeeklySummaryCard
          childName={home.childName}
          summary={summary}
          onReportClick={() => navigate(`/guardian/report/${selectedId}`)}
        />
        <MissingWordCard
          missingWords={missingWords}
          onClick={() => navigate(`/guardian/missing-words/${selectedId}`)}
        />
        <FreeTrialCard freeTrial={FREE_TRIAL_PLACEHOLDER} />
      </div>
      {/* 하단 패널 */}
      <div className="px-6 pt-3 pb-14">
        <Button
          text={`${home.childName} 아이 모드로 가기`}
          showArrow
          fullWidth
          onClick={goToChildMode}
        />
      </div>
    </main>
  );
}
