import type { ReactNode } from "react";

interface SettingSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function SettingSection({
  title,
  description,
  children,
}: SettingSectionProps) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-noto text-xs font-bold leading-4 text-[#6F6A8C]">
        {title}
      </h2>
      <ul className="w-[354px] bg-white rounded-3xl divide-y divide-[#EFE6D3] shadow-[0px_5px_0px_0px_rgba(231,228,243,1.00)]">
        {children}
      </ul>
      {description && (
        <p className="font-noto text-[10px] font-bold leading-4 break-keep text-[#B5B0CC] px-4 mt-1">
          {description}
        </p>
      )}
    </section>
  );
}
