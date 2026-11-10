import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MissingWordItem from "../../components/Guardian/MissingWordItem";
import GuardianPage from "../../layout/GuardianPage";
import { getWordRequests, resolveWordRequest } from "../../api/guardian";

type Word = Awaited<ReturnType<typeof getWordRequests>>[number];

export default function MissingWords() {
  const { childId } = useParams();
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const submittingIdsRef = useRef(new Set<number>()); // 단어별 중복 요청 방지

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

  // 모야에게 알려주기 (성공하면 true, 실패하면 false)
  const handleSubmit = async (id: number, correctedText: string) => {
    if (submittingIdsRef.current.has(id)) return false;
    submittingIdsRef.current.add(id);

    try {
      const result = await resolveWordRequest(id, correctedText);
      setWords((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, correctedText: result.correctedWord, status: result.status }
            : w
        )
      );
      return true;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : null;
      alert(message ?? "단어를 저장하지 못했어요. 다시 시도해 주세요.");
      return false;
    } finally {
      submittingIdsRef.current.delete(id);
    }
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