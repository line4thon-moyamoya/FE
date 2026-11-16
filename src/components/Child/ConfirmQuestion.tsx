import Button from "../common/Button/Button";
import RetryButton from "../common/RetryButton/RetryButton";
import MoyaAside from "./MoyaAside";
import PictureCard from "./PictureCard";
import WordCard from "./WordCard";

/** 아이가 고를 수 있는 한 칸. 단어 후보일 수도, 같은 단어의 다른 뜻일 수도 있다 */
export interface ConfirmOption {
  id: string;
  word: string;
  description: string;
  imageUrl?: string | null;
}

interface ConfirmQuestionProps {
  /** 1개면 단어 카드, 2개 이상이면 그림 카드 */
  options: ConfirmOption[];
  /** 모야가 되묻는 말 */
  line: string;
  /** 고른 칸을 확정 */
  onConfirm: (id: string) => void;
  /** 아니야 / 다 아니야 */
  onDeny: () => void;
  /** 모르겠어. 넘기지 않으면 버튼을 숨긴다 */
  onUnknown?: () => void;
  /** 다시 말하기 */
  onRetry: () => void;
  /** 말풍선의 다시 듣기 */
  onReplay?: () => void;
  /** 카드의 다시 듣기 */
  onOptionReplay?: (id: string) => void;
}

/**
 * 확인 질문 화면. 2-4 / 2-4a / 2-4b / 2-4c 가 모두 이 모양이다.
 * 칸이 하나면 큰 단어 카드와 아니야·맞아!, 둘 이상이면 그림 카드와 다 아니야.
 */
export default function ConfirmQuestion({
  options,
  line,
  onConfirm,
  onDeny,
  onUnknown,
  onRetry,
  onReplay,
  onOptionReplay,
}: ConfirmQuestionProps) {
  const single = options.length === 1;
  const only = options[0];

  return (
    <div className="flex flex-1 flex-col gap-6ConnectionLost.tsx px-6 pt-[18px] pb-[14px]">
      <MoyaAside line={line} onReplay={onReplay} />

      {/* 카드가 하나면 다시 말하기를 카드 안에 넣고, 여럿이면 카드 위 오른쪽 끝에 둔다 */}
      {!single && (
        <div className="mt-5 mb-5 flex justify-end">
          <RetryButton onClick={onRetry} />
        </div>
      )}

      {/* 카드가 하나면 사이에 다시 말하기 줄이 없어서 직접 띄운다 */}
      <div className={`flex flex-col items-center gap-6 ${single ? "mt-4" : ""}`}>
        {single ? (
          <WordCard
            word={only.word}
            description={only.description}
            imageUrl={only.imageUrl}
            onRetry={onRetry}
            onReplay={onOptionReplay && (() => onOptionReplay(only.id))}
          />
        ) : (
          <div className="grid w-full grid-cols-2 gap-3">
            {options.map((option) => (
              <PictureCard
                key={option.id}
                word={option.word}
                hint={option.description}
                imageUrl={option.imageUrl}
                onClick={() => onConfirm(option.id)}
                onReplay={onOptionReplay && (() => onOptionReplay(option.id))}
              />
            ))}
          </div>
        )}

        <div className="flex w-full flex-col gap-3">
          {single ? (
            <div className="grid grid-cols-2 gap-3">
              <Button text="아니야" variant="secondary" size="normal" fullWidth onClick={onDeny} />
              <Button
                text="맞아!"
                size="normal"
                icon="check"
                fullWidth
                onClick={() => onConfirm(only.id)}
              />
            </div>
          ) : (
            <Button text="다 아니야" variant="secondary" size="normal" fullWidth onClick={onDeny} />
          )}

          {onUnknown && (
            <Button text="모르겠어" variant="dashed" size="normal" fullWidth onClick={onUnknown} />
          )}
        </div>
      </div>
    </div>
  );
}
