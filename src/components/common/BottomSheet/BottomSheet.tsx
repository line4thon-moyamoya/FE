import { useEffect, type ReactNode } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
}

export default function BottomSheet({
  isOpen,
  onClose,
  children,
  ariaLabel,
}: BottomSheetProps) {

  // 열려 있을 때 ESC로 닫기 + 뒤쪽 화면 스크롤 막기
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* 어두운 배경 (누르면 닫기) */}
      <div
        className="absolute inset-0 bg-[#241F48]/50 animate-fade-in"
        onClick={onClose}
      />

      {/* 시트 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className="relative w-full max-w-[402px] rounded-t-[32px] bg-[#FBFBFB] px-6 pt-3 pb-12 animate-slide-up"
      >
        {/* 손잡이 */}
        <div className="mx-auto mb-5 h-[5px] w-11 rounded-full bg-[#D9D3E6]" />
        {children}
      </div>
    </div>
  );
}
