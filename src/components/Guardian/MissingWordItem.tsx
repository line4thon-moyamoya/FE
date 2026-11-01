import { useEffect, useRef, useState } from "react";
import type { MissingWord } from "../../types/guardian";
import { formatDateTime } from "../../utils/formatDate";
import speaker from "../../assets/icons/speaker.svg";
import check from "../../assets/icons/missing_check.svg";

interface MissingWordItemProps {
  word: MissingWord;
  onSubmit: (id: number, correctedText: string) => void;
}

export default function MissingWordItem({
  word,
  onSubmit,
}: MissingWordItemProps) {
  const [input, setInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isCorrected = word.correctedText !== null;
  const trimmed = input.trim();

  const handlePlay = () => {
    if (!word.audioUrl) return;
    if (!audioRef.current) {
      const audio = new Audio(word.audioUrl);
      audio.addEventListener("play", () => setIsPlaying(true));
      audio.addEventListener("ended", () => setIsPlaying(false));
      audio.addEventListener("pause", () => setIsPlaying(false));
      audioRef.current = audio;
    }
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .catch((err) => console.error("녹음 재생 실패", err));
  };

  // 페이지를 나가면 재생 멈추기
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const handleSubmit = () => {
    if (!trimmed) return;
    onSubmit(word.id, trimmed);
    setInput("");
  };

  return (
    <li className="w-[354px] justify-start items-start flex flex-col gap-3 bg-white rounded-3xl p-4 shadow-[0px_5px_0px_0px_rgba(231,228,243,1.00)]">
      {/* 상단: 스피커 + 들은 말 + 시간 */}
      <div className="flex items-center gap-3">
        <div className="relative flex shrink-0 w-10 h-10">
          {/* 재생 중일 때 퍼지는 원 */}
          {isPlaying && (
            <>
              <span className="absolute inset-0 rounded-2xl bg-[#7B61F8] opacity-40 animate-ping" />
              <span className="absolute -inset-1 rounded-2xl border-2 border-[#7B61F8] opacity-30 animate-ping [animation-delay:300ms]" />
            </>
          )}
          <button
            type="button"
            onClick={handlePlay}
            aria-label={isPlaying ? "녹음 재생 중" : "녹음 재생"}
            className="relative cursor-pointer flex w-10 h-10 items-center justify-center rounded-2xl bg-[#7B61F8] border-2 border-white shadow-[0px_3px_8px_0px_rgba(106,79,243,0.28)]"
          >
            <img src={speaker} className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-0.5">
          <p className="font-jua text-xl font-normal leading-7 text-[#241F48]">
            ‘{word.heardText}’
          </p>
          <p className="font-noto text-xs font-bold leading-4 text-[#9E98BF]">
            {formatDateTime(word.askedAt)} ·{" "}
            {isPlaying ? "재생 중 …" : "녹음 듣기"}
          </p>
        </div>
      </div>

      {isCorrected ? (
        /* 이미 알려준 상태 */
        <div className="w-[322px] h-[50px] flex items-center justify-between mt-4 rounded-2xl bg-[#F5F3FA] px-4">
          <span className="font-jua text-base font-normal leading-6 text-[#241F48]">
            {word.correctedText}
          </span>
          <span className="w-[92px] h-[23px] flex items-center gap-1 rounded-full bg-[#D2EC7C] pl-2 pr-2.5 leading-4 font-noto text-xs font-bold text-[#241F48]">
            <img src={check} className="w-[14px] h-[14px]" />
            알려줬어요
          </span>
        </div>
      ) : (
        /* 아직 안 알려준 상태 */
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-3 mt-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="아이가 말한 단어는?"
            className="w-[322px] h-[50px] rounded-2xl bg-[#F6F5FA] px-4 font-noto font-bold text-base leading-6 text-[#241F48] placeholder:text-[#9E98BF] outline-none focus:ring-2 focus:ring-[#D9D2FF]"
          />
          <button
            type="submit"
            disabled={!trimmed}
            className="cursor-pointer w-[322px] h-15 rounded-[20px] px-5 bg-white border-2 border-[#D9D0FF] shadow-[0px_5px_0px_0px_rgba(228,220,255,1.00)] font-jua text-xl font-normal leading-6 text-[#6A4FF3] disabled:cursor-not-allowed disabled:opacity-50"
          >
            모야에게 알려주기
          </button>
        </form>
      )}
    </li>
  );
}
