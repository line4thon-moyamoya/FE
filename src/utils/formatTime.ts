export const formatTime = (totalSec: number) => {
  const sec = Math.max(0, Math.floor(totalSec));
  const minutes = Math.floor(sec / 60);
  const seconds = String(sec % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};