import Button from "../common/Button/Button";
import Moya from "../common/Moya/Moya";
import SpeechBubble from "../common/SpeechBubble/SpeechBubble";
import { speak } from "../../utils/speak";

const LINE = "앗, 모야 우주선 신호가 약해!\n다시 해 볼까?";

interface ConnectionLostProps {
  onRetry: () => void;
  onGoHome: () => void;
}

export default function ConnectionLost({
  onRetry,
  onGoHome,
}: ConnectionLostProps) {
  return (
    <section
      role="alert"
      className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-6 pt-[70px] pb-5"
    >
      <SpeechBubble text={LINE} width={316} onReplay={() => speak(LINE)} />

      <Moya look="default" mood="confused" size={220} className="mt-6" />

      {/* 화면 아래로 밀지 않고 모야 바로 밑에 붙인다 */}
      <div className="mt-10 flex w-full flex-col gap-3">
        <Button
          text="다시 해 볼래"
          size="normal"
          icon="reset"
          fullWidth
          onClick={onRetry}
        />
        <Button
          text="처음으로"
          variant="dashed"
          size="normal"
          icon="home"
          fullWidth
          onClick={onGoHome}
        />
      </div>
    </section>
  );
}
