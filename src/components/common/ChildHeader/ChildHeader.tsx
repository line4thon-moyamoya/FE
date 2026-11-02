import avatarDefault from "../../../assets/icons/avatar.png";
import lock from "../../../assets/icons/lock.svg";

/** 쿠폰 도장 칸 수. 다 채우면 노래가 열림 */
const STAMP_SLOTS = 4;

interface ChildHeaderProps {
  childName?: string;
  avatarSrc?: string;
  /** 모은 쿠폰 수 (0~5). 5가 되면 노래가 열림 */
  coupons?: number;
  onCouponClick?: () => void;
  onGuardianClick?: () => void;
}

/* note.svg */
function NoteIcon({ size }: { size: number }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className="text-current"
    >
      <path
        d="M7.5 14.5835V5.16683L15.8333 3.3335V12.7502"
        stroke="currentColor"
        strokeWidth="2.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="5.333" cy="14.833" rx="2.75" ry="2.333" fill="currentColor" />
      <ellipse cx="13.667" cy="12.833" rx="2.75" ry="2.333" fill="currentColor" />
    </svg>
  );
}

export default function ChildHeader({
  childName = "",
  avatarSrc,
  coupons = 0,
  onCouponClick,
  onGuardianClick,
}: ChildHeaderProps) {
  const stamped = Math.min(Math.max(coupons, 0), STAMP_SLOTS);
  const unlocked = coupons >= STAMP_SLOTS + 1;

  return (
    <header className="flex w-full items-center justify-between px-5 py-1.5">
      <div className="flex items-center gap-3">
        <img
          src={avatarSrc ?? avatarDefault}
          alt={childName ? `${childName} 프로필` : "프로필"}
          className="h-11 w-11 shrink-0 rounded-full object-cover"
        />

        <button
          type="button"
          onClick={onCouponClick}
          aria-label={`노래 쿠폰 ${coupons}개 모음. 눌러서 보기`}
          className="flex cursor-pointer items-center gap-1.5"
        >
          <span className="flex items-center gap-1">
            {Array.from({ length: STAMP_SLOTS }, (_, index) =>
              index < stamped ? (
                <span
                  key={index}
                  className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-lime text-ink"
                >
                  <NoteIcon size={16} />
                </span>
              ) : (
                <span
                  key={index}
                  className="h-[26px] w-[26px] rounded-full border-[1.5px] border-line bg-white"
                />
              ),
            )}
          </span>

          <span
            className={`flex h-[34px] w-[34px] items-center justify-center rounded-full
              ${unlocked ? "bg-brand text-white" : "bg-lavender text-ink-muted"}`}
          >
            <NoteIcon size={20} />
          </span>
        </button>
      </div>

      <button
        type="button"
        onClick={onGuardianClick}
        className="flex cursor-pointer items-center gap-1 rounded-full bg-white py-[7px] pr-3 pl-2.5"
      >
        <img src={lock} alt="" className="h-3.5 w-3.5" />
        <span className="font-noto text-xs font-bold text-ink-muted">보호자</span>
      </button>
    </header>
  );
}
