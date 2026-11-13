import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, onClose, duration = 2000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      role="status"
      className="fixed bottom-10 left-1/2 z-[70] w-[calc(100%-48px)] max-w-[calc(var(--container-content)-48px)] -translate-x-1/2 rounded-3xl bg-[#241F48]/90 px-5 py-3 text-center font-noto text-sm font-bold break-words text-white shadow-lg"
    >
      {message}
    </div>
  );
}