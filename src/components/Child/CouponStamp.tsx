import NoteIcon from "../common/NoteIcon/NoteIcon";

interface CouponStampProps {
  label: string;
}

/** 카드 획득 화면 오른쪽 위에 튀어나오는 쿠폰 도장 */
export default function CouponStamp({ label }: CouponStampProps) {
  return (
    <span
      className="animate-stamp-pop absolute top-[134px] right-6 flex items-center gap-1
        rounded-full bg-lime py-1.5 pr-3 pl-2.5 text-on-lime shadow-stamp"
    >
      <NoteIcon size={18} />
      <span className="font-jua text-[15px] font-normal">{label}</span>
    </span>
  );
}
