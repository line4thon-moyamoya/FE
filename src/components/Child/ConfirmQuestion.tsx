import Button from "../common/Button/Button";
import MoyaAside from "./MoyaAside";
import PictureCard from "./PictureCard";
import WordCard from "./WordCard";
import type { ConfirmQuiz } from "../../types/child";

interface ConfirmQuestionProps {
  quiz: ConfirmQuiz;
  /** 맞아! 또는 후보 카드를 골랐을 때 */
  onConfirm: (word: string) => void;
  /** 아니야 / 다 아니야 */
  onDeny: () => void;
  /** 다시 말하기 */
  onRetry: () => void;
}

export default function ConfirmQuestion({
  quiz,
  onConfirm,
  onDeny,
  onRetry,
}: ConfirmQuestionProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 px-6 pt-[18px] pb-[14px]">
      <MoyaAside line={quiz.line} />

      <div className="flex flex-col items-center gap-6">
        {quiz.kind === "single" ? (
          <WordCard word={quiz.word} description={quiz.description} />
        ) : (
          <div className="flex gap-3">
            {quiz.candidates.map((candidate) => (
              <PictureCard
                key={candidate.word}
                word={candidate.word}
                hint={candidate.hint}
                onClick={() => onConfirm(candidate.word)}
              />
            ))}
          </div>
        )}

        <div className="flex w-full flex-col gap-3">
          {quiz.kind === "single" ? (
            <div className="flex gap-3">
              <Button text="아니야" variant="secondary" size="normal" fullWidth onClick={onDeny} />
              <Button
                text="맞아!"
                size="normal"
                icon="check"
                fullWidth
                onClick={() => onConfirm(quiz.word)}
              />
            </div>
          ) : (
            <Button text="다 아니야" variant="dashed" size="normal" fullWidth onClick={onDeny} />
          )}

          <Button
            text="다시 말하기"
            variant="secondary"
            size="normal"
            fullWidth
            onClick={onRetry}
          />
        </div>
      </div>
    </div>
  );
}
