export const formatDateTime = (iso: string) => {
  const date = new Date(iso);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours < 12 ? "오전" : "오후";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;

  return `${month}월 ${day}일 ${period} ${displayHour}:${minutes}`;
};

// "2026-10-06", "2026-10-12" → "10.6 - 10.12"
export const formatDateRange = (start: string, end: string) => {
  const s = new Date(start);
  const e = new Date(end);
  return `${s.getMonth() + 1}.${s.getDate()} - ${e.getMonth() + 1}.${e.getDate()}`;
};

// weeksAgo=1 이면 지난주 월요일. toISOString() 금지 (UTC 변환 시 하루 밀림)
export const getWeekStartDate = (weeksAgo = 0, base = new Date()) => {
  const d = new Date(base);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7) - weeksAgo * 7);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

// "2026-11-09" → "11월 2주"
export const formatWeekLabel = (weekStartDate: string) => {
  const [, m, d] = weekStartDate.split("-").map(Number);
  return `${m}월 ${Math.ceil(d / 7)}주`;
};