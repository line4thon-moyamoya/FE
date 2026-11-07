import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SongCouponCard from "../../components/Child/SongCouponCard";
import SongListItem from "../../components/Child/SongListItem";
import { getSongs, type SongSummary } from "../../api/song";
import { getWordbook } from "../../api/wordbook";
import { useChildMode } from "../../contexts/ChildModeContext";
import { COUPON_GOAL } from "../../types/child";

/** 카드 몇 장마다 쿠폰 한 장 */
const CARDS_PER_COUPON = 5;

export default function WordSong() {
  const navigate = useNavigate();
  const { child, coupons, childPath } = useChildMode();

  const [songs, setSongs] = useState<SongSummary[] | null>(null);
  const [remainingWords, setRemainingWords] = useState(CARDS_PER_COUPON);

  useEffect(() => {
    let alive = true;

    getSongs(child.childId)
      .then((data) => alive && setSongs(data))
      .catch(() => alive && setSongs([]));

    // 다음 쿠폰까지 몇 개 남았는지는 모은 카드 수로 센다
    getWordbook(child.childId)
      .then((data) => {
        if (!alive) return;
        setRemainingWords(
          CARDS_PER_COUPON - (data.totalCount % CARDS_PER_COUPON),
        );
      })
      .catch(() => {});

    return () => {
      alive = false;
    };
  }, [child.childId]);

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 pt-6 pb-6">
      <h1 className="font-jua text-2xl leading-9 text-ink">단어 노래</h1>

      <SongCouponCard
        coupons={coupons}
        total={COUPON_GOAL}
        remainingWords={remainingWords}
      />

      <section className="flex flex-col gap-3">
        <h2 className="font-jua text-xl leading-7 text-ink">우리 노래</h2>

        {!songs ? (
          <div aria-busy className="h-20" />
        ) : songs.length === 0 ? (
          <p className="mt-4 text-center font-jua text-base leading-6 text-ink-muted">
            아직 만든 노래가 없어요.
            <br />
            쿠폰을 모으면 노래가 생겨!
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {songs.map((song) => (
              <SongListItem
                key={song.songId}
                song={song}
                onClick={() => navigate(childPath(`song/${song.songId}`))}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
