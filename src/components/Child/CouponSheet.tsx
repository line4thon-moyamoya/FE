import Button from "../common/Button/Button";
import NoteIcon from "../common/NoteIcon/NoteIcon";
import { COUPON_GOAL } from "../../types/child";

interface CouponSheetProps {
  coupons: number;
  /** 지금 물어볼래 */
  onStart: () => void;
  onClose: () => void;
}

/** 아이 헤더의 쿠폰을 누르면 아래에서 올라오는 시트 */
export default function CouponSheet({ coupons, onStart, onClose }: CouponSheetProps) {
  return (
    // 탭바가 z-50 이라 그 위로 올라오게 함
    <div className="fixed inset-0 z-60 flex flex-col items-center justify-end">
      {/* 바깥을 누르면 닫힘 */}
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-dim"
      />

      <div className="animate-sheet-up relative flex max-h-[90dvh] w-full max-w-content flex-col items-center gap-5 overflow-y-auto overscroll-contain rounded-t-[32px] bg-cream px-6 pt-3 pb-12">
        <span aria-hidden className="h-[5px] w-11 rounded-[3px] bg-handle" />

        <div className="flex w-full flex-col gap-9">
          <div className="flex w-full flex-col items-center gap-5">
            <div className="flex w-full items-center justify-between">
              <h2 className="font-jua text-[26px] leading-[1.3] font-normal text-ink">
                노래 쿠폰
              </h2>
              <span className="font-jua text-lg leading-[1.4] font-normal text-brand">
                {coupons} / {COUPON_GOAL}
              </span>
            </div>

            <div className="flex w-full items-center gap-3.5 rounded-3xl p-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-3xl bg-lavender text-brand">
                <NoteIcon size={26} />
              </span>

              <div className="flex flex-1 flex-col gap-2">
                <p className="font-jua text-[21px] leading-[1.35] font-normal text-ink">
                  새 단어를 물어보면 1장!
                </p>

                <div className="flex gap-1.5">
                  {Array.from({ length: COUPON_GOAL }, (_, index) =>
                    index < coupons ? (
                      <span
                        key={index}
                        className="flex h-9 w-9 items-center justify-center rounded-[18px] bg-lime text-ink"
                      >
                        <NoteIcon size={20} />
                      </span>
                    ) : (
                      <span
                        key={index}
                        className="h-9 w-9 rounded-[18px] border-2 border-line-lavender bg-white"
                      />
                    ),
                  )}
                </div>
              </div>
            </div>

            <p className="flex items-center gap-2">
              <span className="font-noto text-[15px] leading-[1.55] font-bold text-ink-soft">
                {COUPON_GOAL}장 다 모으면
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-brand-action py-[7px] pr-3.5 pl-3 text-white">
                <NoteIcon size={18} />
                <span className="font-jua text-base font-normal">우리 노래가 생겨!</span>
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button text="지금 물어볼래" size="normal" icon="mic" fullWidth onClick={onStart} />
            <Button text="닫기" variant="dashed" size="normal" fullWidth onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
