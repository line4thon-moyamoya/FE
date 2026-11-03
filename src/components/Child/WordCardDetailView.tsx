import type { Word } from "../../types/word";
import { iya } from "../../utils/josa";
import notebookCard from "../../assets/icons/word_book.svg";

export default function WordCardDetailView({ word }: { word: Word }) {
  return (
    <section className="w-[354px] h-[302px] rounded-3xl bg-white shadow-[0px_6px_0px_0px_rgba(250,237,209,1.00)] gap-2.5">
      {/* 내 카드 라벨 */}
      <div className="flex items-center gap-2 bg-[#E6F4C4] px-[18px] py-2.5 rounded-t-3xl">
        <img src={notebookCard} className="w-5 h-5" />
        <span className="font-jua text-base leading-5 font-normal text-[#241F48]">
          내 카드
        </span>
      </div>

      <div className="flex flex-col items-center pt-2.5 pb-[22px] gap-2.5">
        <img src={word.image} className="w-30 h-30 object-contain" />

        <p className="font-normal font-jua text-[#241F48]">
          <span className="text-5xl">{word.word}</span>
          <span className="ml-[6px] text-2xl text-[#9E98BF]">
            {iya(word.word)}
          </span>
        </p>

        <hr className="w-[306px] h-[2px] border-[#EFE6D3]" />

        <p className="text-center font-noto text-base font-bold leading-6 text-[#241F48]">
          {word.meaning}
        </p>
      </div>
    </section>
  );
}
