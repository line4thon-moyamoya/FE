import { useId } from "react";

interface InputProps {
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** 입력이 잘못됐을 때 아래에 보여 줄 문구 */
  error?: string | null;
}

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}: InputProps) {
  const id = useId();

  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={id}
        className="font-noto text-xs font-bold text-[#6F6A8C]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        className="h-[54px] w-full rounded-2xl bg-white px-4 font-jua text-base leading-6 font-normal
    text-[#241F48] outline-none placeholder:text-[#B5B1C9] focus:ring-2 focus:ring-[#6A4FF3]"
      />
      {error && (
        <p className="font-noto text-xs font-bold text-brand-action">{error}</p>
      )}
    </div>
  );
}
