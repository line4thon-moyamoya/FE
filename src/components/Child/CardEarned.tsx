import wordBook from "../../assets/icons/word-book.svg";
import Button from "../common/Button/Button";
import CouponStamp from "./CouponStamp";
import MoyaAside from "./MoyaAside";
import { getWordIcon } from "../../constants/wordIcons";
import { COUPON_GOAL } from "../../types/child";
import { iya } from "../../utils/josa";

interface CardEarnedProps {
  word: string;
  description: string;
  /** 지금까지 모은 쿠폰 수 */
  coupons: number;
  /** 또 물어볼래 */
  onAskAnother: () => void;
  /** 단어 수첩 버튼 */
  onOpenNotebook: () => void;
}

/**
 * 카드 획득 화면. 쿠폰을 다 모으면 같은 화면이 노래 완성 화면이 됨.
 * 두 화면은 대사와 도장 글만 다름.
 */
export default function CardEarned({
  word,
  description,
  coupons,
  onAskAnother,
  onOpenNotebook,
}: CardEarnedProps) {
  const complete = coupons >= COUPON_GOAL;
  const icon = getWordIcon(word);

  const line = complete
    ? "쿠폰 다섯 장!\n우리 노래가 생겼어!"
    : `쿠폰 받았다! 짝짝!\n노래까지 ${COUPON_GOAL - coupons}개 남았어!`;

  return (
    <div className="relative flex flex-1 flex-col gap-6 px-6 pt-[18px] pb-[14px]">
      <MoyaAside line={line} mood="excited" moyaSize={88} />

      <div className="flex flex-col gap-9">
        <div className="flex flex-col items-center gap-2.5 overflow-hidden rounded-[28px] bg-white pb-[22px] shadow-word-card">
          {/* 머리띠 */}
          <div className="flex w-full items-center gap-1.5 bg-lime-card px-[18px] py-2.5">
            <img src={wordBook} alt="" className="h-5 w-5" />
            <span className="font-jua text-[15px] leading-[1.3] font-normal text-ink">
              새 카드
            </span>
          </div>

          {icon && <img src={icon} alt="" className="h-[120px] w-[120px]" />}

          <p className="flex items-baseline gap-1.5">
            <strong className="font-jua text-[44px] font-normal text-ink">{word}</strong>
            <span className="font-jua text-2xl font-normal text-ink-muted">{iya(word)}</span>
          </p>

          <span className="h-0.5 w-[306px] bg-line-cream" />

          <p className="w-[306px] text-center font-noto text-[15px] leading-[1.55] font-bold text-ink">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            text="또 물어볼래"
            size="normal"
            icon="mic"
            fullWidth
            onClick={onAskAnother}
          />
          <button
            type="button"
            onClick={onOpenNotebook}
            aria-label="단어 수첩 열기"
            className="flex h-13 w-13 shrink-0 cursor-pointer items-center justify-center
              rounded-[26px] border-2 border-line-cream bg-white shadow-place-tile
              transition-transform duration-100 active:scale-[0.97]"
          >
            <img src={wordBook} alt="" className="h-[26px] w-[26px]" />
          </button>
        </div>
      </div>

      <CouponStamp label={complete ? `쿠폰 ${COUPON_GOAL}/${COUPON_GOAL}` : "쿠폰 +1"} />
    </div>
  );
}
