import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import StatGrid from "../../components/Guardian/StatGrid";
import WordRecordItem from "../../components/Guardian/WordRecordItem";
import ConversationTipCard from "../../components/Guardian/ConversationTipCard";
import GuardianPage from "../../layout/GuardianPage";
import mic from "../../assets/icons/mic.svg";
import { getWeeklyReport, type WeeklyReportData } from "../../api/guardian";
import {
  formatDateRange,
  formatWeekLabel,
  getWeekStartDate,
} from "../../utils/formatDate";
import { iga } from "../../utils/josa";
import { getWordIcon } from "../../constants/wordIcons";
import type { WordRecord } from "../../types/guardian";

// 리포트는 주가 끝난 뒤(다음 주 월요일 00:10) 만들어지므로 지난주를 조회
const WEEKS_AGO = 1;

export default function WeeklyReport() {
  const { childId } = useParams();
  const id = Number(childId);

  const [report, setReport] = useState<WeeklyReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false); // 해당 주 리포트 없음

  useEffect(() => {
    if (!id) return;

    let ignore = false;
    setIsLoading(true);
    setIsError(false);
    setIsEmpty(false);

    getWeeklyReport(id, getWeekStartDate(WEEKS_AGO))
      .then((data) => {
        if (ignore) return;
        if (!data) setIsEmpty(true);
        else setReport(data);
      })
      .catch((error) => {
        if (ignore) return;
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setIsEmpty(true);
        } else {
          setIsError(true);
        }
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  // 잘못된 주소면 보호자 홈으로
  if (!id) return <Navigate to="/guardian" replace />;

  if (isLoading) return <GuardianPage title="주간 리포트">{null}</GuardianPage>;

  if (isError || isEmpty || !report) {
    return (
      <GuardianPage title="주간 리포트">
        <p className="px-6 mt-6 font-jua text-ink">
          {isError
            ? "리포트를 불러오지 못했어요."
            : "아직 만들어진 주간 리포트가 없어요."}
        </p>
      </GuardianPage>
    );
  }

  // 서버 응답 → 기존 컴포넌트 형식
  const summary = {
    askedCount: report.questionCount,
    missingCount: report.unrecognizedCount,
    reviewedCount: report.questionCount - report.unrecognizedCount, // TODO: 백엔드 확인 필요
  };

  const wordRecords: WordRecord[] = report.words.map((w, i) => ({
    id: w.wordId ?? -(i + 1), // wordId 가 null 인 단어 대비
    word: w.word,
    spokenAs: w.recognizedTexts.filter((t) => t !== w.word).join(", "),
    image: w.imageUrl ?? getWordIcon(w.word),
  }));

  const firstMissing = report.unrecognizedWords[0]?.recognizedText;

  return (
    <GuardianPage title="주간 리포트">
      <section className="flex flex-col pt-[18px] px-6 pb-10 gap-6">
        {/* 제목 */}
        <div className="flex flex-col gap-1">
          <p className="text-[#6F6A8C] text-xs font-bold font-noto leading-4">
            {formatWeekLabel(report.weekStartDate)} ·{" "}
            {formatDateRange(report.weekStartDate, report.weekEndDate)}
          </p>
          <h2 className="text-[#241F48] text-2xl font-normal font-jua leading-8">
            이번 주 {report.childName}
            {iga(report.childName)} 물어본 단어
          </h2>
        </div>

        {/* 통계 + 못 찾은 말 요약 */}
        <div className="flex flex-col gap-3">
          <StatGrid summary={summary} variant="white" />
          <p className="flex items-center gap-2.5 font-jua text-base font-normal leading-6 text-[#241F48]">
            <span className="flex w-8 h-8 items-center justify-center rounded-2xl bg-white">
              <img src={mic} alt="" className="w-[18px] h-[18px]" />
            </span>
            {report.unrecognizedCount === 0
              ? "모야가 못 찾은 말이 없어요"
              : firstMissing
                ? `모야가 못 찾은 말 ${report.unrecognizedCount}개 · ‘${firstMissing}’`
                : `모야가 못 찾은 말 ${report.unrecognizedCount}개`}
          </p>
        </div>

        {/* 단어 기록 */}
        <div className="flex flex-col gap-3">
          <h3 className="font-jua text-xl font-normal leading-7 text-[#241F48]">
            단어 기록
          </h3>
          {wordRecords.length === 0 ? (
            <p className="font-noto text-sm font-bold text-[#9E98BF]">
              이번 주에 물어본 단어가 없어요
            </p>
          ) : (
            <ul className="w-full bg-white rounded-3xl divide-y divide-[#EFE6D3] shadow-[0px_5px_0px_0px_rgba(231,228,243,1.00)]">
              {wordRecords.map((record) => (
                <WordRecordItem key={record.id} record={record} />
              ))}
            </ul>
          )}
        </div>

        {/* 오늘 저녁 대화거리 */}
        {report.conversationTopic && (
          <ConversationTipCard tip={report.conversationTopic} />
        )}
      </section>
    </GuardianPage>
  );
}