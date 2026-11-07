import deleteButton from "../../assets/icons/delete.svg";

interface KeypadProps {
  onNumber: (num: string) => void;
  onDelete: () => void;
}

const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const keyStyle =
  "flex h-[58px] w-[111.33334px] items-center justify-center rounded-2xl border-2 border-[#EFE6D3] bg-white " +
  "font-jua text-2xl text-[#241F48] font-normal leading-8 shadow-[0px_4px_0px_0px_rgba(250,237,209,1.00)] cursor-pointer";

export default function Keypad({ onNumber, onDelete }: KeypadProps) {
  return (
    <div className="grid w-full grid-cols-3 gap-[10px] pl-6">
      {NUMBERS.map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => onNumber(num)}
          className={keyStyle}
        >
          {num}
        </button>
      ))}

      {/* 빈칸 */}
      <div />

      <button type="button" onClick={() => onNumber("0")} className={keyStyle}>
        0
      </button>

      {/* 지우기 */}
      <button
        type="button"
        onClick={onDelete}
        className="flex h-14 items-center justify-center"
      >
        <img src={deleteButton} />
      </button>
    </div>
  );
}
