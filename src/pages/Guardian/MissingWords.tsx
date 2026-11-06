import { useState } from "react";

import MissingWordItem from "../../components/Guardian/MissingWordItem";
import useChildByParam from "../../hooks/useChildByParam";
import GuardianPage from "../../layout/GuardianPage";

export default function MissingWords() {
  const { child, redirect } = useChildByParam();

  const [words, setWords] = useState(child?.missingWords ?? []);

  if (redirect) return redirect;

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
    <GuardianPage title="물어볼 단어">
      <ul className="flex flex-col gap-4 px-6 mt-6 pb-10">
        {sortedWords.map((word) => (
          <MissingWordItem key={word.id} word={word} onSubmit={handleSubmit} />
        ))}
      </ul>
    </GuardianPage>
  );
}