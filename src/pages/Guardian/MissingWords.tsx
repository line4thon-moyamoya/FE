import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import BackButton from "../../components/common/BackButton/BackButton";
import MissingWordItem from "../../components/Guardian/MissingWordItem";
import { MOCK_CHILD_LIST } from "../../mocks/guardian";

export default function MissingWords() {
  const { childId } = useParams();
  const child = MOCK_CHILD_LIST.find((c) => c.id === Number(childId));

  const [words, setWords] = useState(child?.missingWords ?? []);

  // 없는 아이 id로 들어오면 보호자 홈으로
  if (!child) return <Navigate to="/guardian" replace />;

  // 최신순 정렬
  const sortedWords = [...words].sort(
    (a, b) => new Date(b.askedAt).getTime() - new Date(a.askedAt).getTime()
  );

  const handleSubmit = (id: number, correctedText: string) => {
    setWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, correctedText } : w))
    );
  };

  return (
    <div className="min-h-full w-full bg-[#FBFBFB] flex flex-col">
      <header className="flex items-center gap-2.5">
        <BackButton />
        <h1 className="text-[#241F48] text-xl font-normal font-jua leading-7 mt-[73px]">
          물어볼 단어
        </h1>
      </header>

      <ul className="flex flex-col gap-4 px-6 mt-6 pb-10">
        {sortedWords.map((word) => (
          <MissingWordItem key={word.id} word={word} onSubmit={handleSubmit} />
        ))}
      </ul>
    </div>
  );
}