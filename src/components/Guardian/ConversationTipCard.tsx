export default function ConversationTipCard({ tip }: { tip: string }) {
  return (
    <section className="flex flex-col justify-start items-start gap-1.5 w-full bg-white rounded-3xl px-4 py-[14px] shadow-[0px_5px_0px_0px_rgba(231,228,243,1.00)]">
      <p className="font-jua text-base font-normal leading-6 text-[#6A4FF3]">
        오늘 저녁 대화거리
      </p>
      <p className="font-noto text-sm font-bold leading-5 text-[#241F48]">
        {tip}
      </p>
    </section>
  );
}
