import Button from "../common/Button/Button";
import MoyaAside from "./MoyaAside";
import PictureCard from "./PictureCard";
import WordCard from "./WordCard";
import type { Candidate } from "../../api/question";

interface ConfirmQuestionProps {
  /** 서버가 찾아 준 후보. 1개면 단어 카드, 2개 이상이면 그림 카드 */
  candidates: Candidate[];
  /** 모야가 되묻는 말 */
  line: string;
  /** 고른 후보를 확정 */
  onConfirm: (candidateId: string) => void;
  /** 아니야 / 다 아니야 */
  onDeny: () => void;
  /** 다시 말하기 */
  onRetry: () => void;
  /** 말풍선의 다시 듣기 */
  onReplay?: () => void;
}

export default function ConfirmQuestion({
  candidates,
  line,
  onConfirm,
  onDeny,
  onRetry,
  onReplay,
}: ConfirmQuestionProps) {
  const single = candidates.length === 1;
  const only = candidates[0];

  return (
    <div className="flex flex-1 flex-col gap-6 px-6 pt-[18px] pb-[14px]">
      <MoyaAside line={line} onReplay={onReplay} />

      <div className="flex flex-col items-center gap-6">
        {single ? (
          <WordCard word={only.word} description={only.description} />
        ) : (
          <div className="flex gap-3">
            {candidates.map((candidate) => (
              <PictureCard
                key={candidate.candidateId}
                word={candidate.word}
                hint={candidate.description}
                onClick={() => onConfirm(candidate.candidateId)}
              />
            ))}
          </div>
        )}

        <div className="flex w-full flex-col gap-3">
          {single ? (
            <div className="flex gap-3">
              <Button text="아니야" variant="secondary" size="normal" fullWidth onClick={onDeny} />
              <Button
                text="맞아!"
                size="normal"
                icon="check"
                fullWidth
                onClick={() => onConfirm(only.candidateId)}
              />
            </div>
          ) : (
            <Button text="다 아니야" variant="dashed" size="normal" fullWidth onClick={onDeny} />
          )}

          <Button text="다시 말하기" variant="secondary" size="normal" fullWidth onClick={onRetry} />
        </div>
      </div>
    </div>
  );
}
