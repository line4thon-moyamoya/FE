import { useNavigate } from "react-router-dom";
import SongCouponCard from "../../components/Child/SongCouponCard";
import SongListItem from "../../components/Child/SongListItem";
import {
  COUPONS_PER_SONG,
  getCollectedCards,
  getRemainingForNextCoupon,
} from "../../mocks/notebook";
import { getSongs } from "../../mocks/songs";
import { useChildMode } from "../../contexts/ChildModeContext";

export default function WordSong() {
  const navigate = useNavigate();
  const { child, coupons } = useChildMode();

  const songs = getSongs(child.id);
  const remainingWords = getRemainingForNextCoupon(
    getCollectedCards(child.id).length,
  );

  return (
    <>
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 pt-6 pb-6">
        <h1 className="font-jua text-2xl leading-9 text-[#241F48]">단어 노래</h1>

        <SongCouponCard
          coupons={coupons}
          total={COUPONS_PER_SONG}
          remainingWords={remainingWords}
        />

        <section className="flex flex-col gap-3">
          <h2 className="font-jua text-xl leading-7 text-[#241F48]">우리 노래</h2>

          {songs.length === 0 ? (
            <p className="mt-4 text-center font-jua text-base leading-6 text-[#9E98BF]">
              아직 만든 노래가 없어요.
              <br />
              쿠폰을 모으면 노래가 생겨!
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {songs.map((song) => (
                <SongListItem
                  key={song.id}
                  song={song}
                  onClick={() => navigate(`/song/${song.id}`)}
                />
              ))}
            </ul>
          )}
        </section>
      </div>

    </>
  );
}