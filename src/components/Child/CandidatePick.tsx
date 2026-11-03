import Button from "../common/Button/Button";
import CandidateCard from "./CandidateCard";
import MoyaAside from "./MoyaAside";
import { MOCK_WORD_CANDIDATES } from "../../mocks/talk";

interface CandidatePickProps {
  onPick: (word: string) => void;
  /** 다 아니야 */
  onDeny: () => void;
}

export default function CandidatePick({ onPick, onDeny }: CandidatePickProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 px-6 pt-[18px] pb-[14px]">
      <MoyaAside line={"이 중에 있어?\n눌러서 골라 줘!"} />

      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-3">
          {MOCK_WORD_CANDIDATES.map((candidate) => (
            <CandidateCard
              key={candidate.word}
              word={candidate.word}
              hint={candidate.hint}
              onClick={() => onPick(candidate.word)}
            />
          ))}
        </div>

        <Button text="다 아니야" variant="dashed" size="normal" fullWidth onClick={onDeny} />
      </div>
    </div>
  );
}
