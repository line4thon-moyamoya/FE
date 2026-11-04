import NoteIcon from "../common/NoteIcon/NoteIcon";
import speaker from "../../assets/icons/speaker.svg";

interface SongCouponCardProps {
  coupons: number;
  total: number;
  remainingWords: number;
  onPlay: () => void;
}

export default function SongCouponCard({
  coupons,
  total,
  remainingWords,
  onPlay,
}: SongCouponCardProps) {
  const canPlay = coupons >= total;

  return (
    <section className="w-[354px] flex flex-col justify-start items-center gap-[14px] rounded-3xl bg-white p-5">
      <div className="flex w-full items-center justify-between">
        <h2 className="font-jua text-lg font-normal text-[#241F48]">
          노래 쿠폰
        </h2>
        <span className="font-jua text-lg font-normal text-[#6A4FF3]">
          {coupons} / {total}
        </span>
      </div>

      {/* 쿠폰 칸 */}
      <ul className="flex justify-center gap-2 mt-4">
        {Array.from({ length: total }, (_, i) =>
          i < coupons ? (
            <li
              key={i}
              className="flex w-[50px] h-[50px] items-center justify-center rounded-3xl bg-[#D2EC7C]"
            >
              <NoteIcon size={26} className="text-[#567814]" />
            </li>
          ) : (
            <li
              key={i}
              className="w-[50px] h-[50px] rounded-3xl border-2 border-dashed border-[#E4DFF5]"
            />
          ),
        )}
      </ul>

      <p className="font-jua font-normal text-lg text-[#241F48]">
        {canPlay
          ? "쿠폰을 다 모았어! 노래를 들어 봐!"
          : `단어 ${remainingWords}개 더 모으면 노래가 생겨!`}
      </p>

      <button
        type="button"
        onClick={onPlay}
        disabled={!canPlay}
        className="flex w-[314px] h-[60px] items-center justify-center gap-2 mt-5 rounded-[20px] font-jua text-lg text-white bg-[#7B61F8] shadow-[0px_4px_0px_0px_rgba(74,53,201,1.00)] cursor-pointer disabled:cursor-not-allowed disabled:bg-[#D6D2E0] disabled:shadow-[0px_4px_0px_0px_rgba(190,185,205,1.00)]"
      >
        <img src={speaker} alt="" className="w-5 h-5" />
        노래 재생
      </button>
    </section>
  );
}
