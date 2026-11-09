import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MissingWordItem from "../../components/Guardian/MissingWordItem";
import GuardianPage from "../../layout/GuardianPage";
import { getWordRequests } from "../../api/guardian";

type Word = Awaited<ReturnType<typeof getWordRequests>>[number];

export default function MissingWords() {
  const { childId } = useParams(); // 라우터의 파라미터 이름과 맞춰 주세요
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    setIsError(false);

    getWordRequests(Number(childId) || undefined)
      .then((data) => {
        if (!ignore) setWords(data);
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
  }, [childId]);

  // 최신순 정렬
  const sortedWords = [...words].sort(
    (a, b) => new Date(b.askedAt).getTime() - new Date(a.askedAt).getTime()
  );

  // 고친 단어 입력 (해결 API 연동 전까지 화면에서만 반영)
  const handleSubmit = (id: number, correctedText: string) => {
    setWords((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, correctedText, status: "RESOLVED" } : w
      )
    );
  };

  return (
    <GuardianPage title="물어볼 단어">
      {isLoading ? null : isError ? (
        <p className="px-6 mt-6 font-jua text-ink">단어를 불러오지 못했어요.</p>
      ) : sortedWords.length === 0 ? (
        <p className="px-6 mt-6 font-jua text-ink">아직 물어볼 단어가 없어요.</p>
      ) : (
        <ul className="flex flex-col gap-4 px-6 mt-6 pb-10">
          {sortedWords.map((word) => (
            <MissingWordItem key={word.id} word={word} onSubmit={handleSubmit} />
          ))}
        </ul>
      )}
    </GuardianPage>
  );
}