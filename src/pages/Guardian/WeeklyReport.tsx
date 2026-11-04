import { Navigate, useParams } from "react-router-dom";
import BackButton from "../../components/common/BackButton/BackButton";
import StatGrid from "../../components/Guardian/StatGrid";
import WordRecordItem from "../../components/Guardian/WordRecordItem";
import ConversationTipCard from "../../components/Guardian/ConversationTipCard";
import { MOCK_CHILD_LIST } from "../../mocks/guardian";
import { formatDateRange } from "../../utils/formatDate";
import mic from "../../assets/icons/mic.svg";

export default function WeeklyReport() {
  const { childId } = useParams();
  const child = MOCK_CHILD_LIST.find((c) => c.id === Number(childId));

  // 없는 아이 id로 들어오면 보호자 홈으로
  if (!child) return <Navigate to="/guardian" replace />;

  const { weeklyReport, weeklySummary, missingWords } = child;
  const pendingWords = missingWords.filter((w) => w.correctedText === null);

  return (
    <main className="min-h-full w-full bg-[#FBFBFB] flex flex-col">
      <header className="flex gap-2.5 items-center pl-6 pt-12">
        <BackButton />
        <h1 className="font-jua leading-7 font-normal text-xl text-[#241F48]">
          주간 리포트
        </h1>
      </header>

      <section className="flex flex-col pt-[18px] px-6 pb-10 gap-6">
        {/* 제목 */}
        <div className="flex flex-col gap-1">
          <p className="text-[#6F6A8C] text-xs font-bold font-noto leading-4">
            {weeklyReport.weekLabel} ·{" "}
            {formatDateRange(weeklyReport.startDate, weeklyReport.endDate)}
          </p>
          <h2 className="text-[#241F48] text-2xl font-normal font-jua leading-8">
            이번 주 {child.name}가 물어본 단어
          </h2>
        </div>

        {/* 통계 + 못 찾은 말 요약 */}
        <div className="flex flex-col gap-3">
          <StatGrid summary={weeklySummary} variant="white" />
          <p className="flex items-center gap-2.5 font-jua text-base font-normal leading-6 text-[#241F48]">
            <span className="flex w-8 h-8 items-center justify-center rounded-2xl bg-white">
              <img src={mic} className="w-[18px] h-[18px]" />
            </span>
            {pendingWords.length === 0
              ? "모야가 못 찾은 말이 없어요"
              : `모야가 못 찾은 말 ${pendingWords.length}개 · ‘${pendingWords[0].heardText}’`}
          </p>
        </div>

        {/* 단어 기록 */}
        <div className="flex flex-col gap-3">
          <h3 className="font-jua text-xl font-normal leading-7 text-[#241F48]">
            단어 기록
          </h3>
          {weeklyReport.wordRecords.length === 0 ? (
            <p className="font-noto text-sm font-bold text-[#9E98BF]">
              이번 주에 물어본 단어가 없어요
            </p>
          ) : (
            <ul className="w-[354px] bg-white rounded-3xl divide-y divide-[#EFE6D3] shadow-[0px_5px_0px_0px_rgba(231,228,243,1.00)]">
              {weeklyReport.wordRecords.map((record) => (
                <WordRecordItem key={record.id} record={record} />
              ))}
            </ul>
          )}
        </div>

        {/* 오늘 저녁 대화거리 */}
        <ConversationTipCard tip={weeklyReport.conversationTip} />
      </section>
    </main>
  );
}
