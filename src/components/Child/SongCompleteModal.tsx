import Button from "../common/Button/Button";
import Moya from "../common/Moya/Moya";
import WordChip from "./WordChip";
import { useChildMode } from "../../contexts/ChildModeContext";

interface SongCompleteModalProps {
  /** 노래에 들어간 단어 */
  words: string[];
  /** 노래 재생 */
  onPlay?: () => void;
  /** 나중에 들을래 */
  onClose: () => void;
}

/** 쿠폰을 다 모으면 노래 완성 화면 위에 뜨는 카드 */
export default function SongCompleteModal({
  words,
  onPlay,
  onClose,
}: SongCompleteModalProps) {
  const { child } = useChildMode();
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center px-[31px]">
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-dim"
      />

      <div
        role="dialog"
        aria-label="노래가 생겼어!"
        className="animate-sticker-pop relative flex max-h-[90dvh] w-full max-w-[calc(var(--container-content)-62px)] flex-col gap-8 overflow-y-auto overscroll-contain rounded-[32px]
          border-4 border-white bg-cream p-6"
      >
        <div className="flex flex-col items-center gap-3">
          <Moya look={child.look} mood="excited" size={150} />

          <strong className="font-jua text-[34px] leading-[1.25] font-normal text-ink">
            노래가 생겼어!
          </strong>

          <div className="flex w-full min-w-0 flex-wrap justify-center gap-1.5">
            {words.map((word) => (
              <WordChip key={word} word={word} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button text="노래 재생" size="normal" icon="speaker" fullWidth onClick={onPlay} />
          <Button
            text="나중에 들을래"
            variant="secondary"
            size="normal"
            fullWidth
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}
