interface PinDotsProps {
  length: number;   // 지금까지 입력한 자릿수
  total?: number;   // 전체 자릿수
}

export default function PinDots({ length, total = 4 }: PinDotsProps) {
  return (
    <div className="flex gap-[18px]">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-5 w-5 rounded-full ${
            i < length ? "bg-[#7B61F8]" : "border-[2.5px] border-[#D9D0FF] bg-white"
          }`}
        />
      ))}
    </div>
  );
}