import { useState } from "react";

import BackButton from "../../components/common/BackButton/BackButton";
import MissingWordItem from "../../components/Guardian/MissingWordItem";
import useChildByParam from "../../hooks/useChildByParam";

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
    <div className="min-h-full w-full bg-[#FBFBFB] flex flex-col">
      <header className="flex items-center gap-2.5 pl-6 pt-12">
        <BackButton />
        <h1 className="text-[#241F48] text-xl font-normal font-jua leading-7 ">
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