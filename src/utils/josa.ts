// 마지막 글자에 받침이 있는지 확인
const hasBatchim = (word: string) => {
  const lastChar = word.charCodeAt(word.length - 1);
  // 한글 음절(가~힣)이 아니면 받침 없음으로 처리
  if (lastChar < 0xac00 || lastChar > 0xd7a3) return false;
  return (lastChar - 0xac00) % 28 !== 0;
};

// "편니점" → "이라고", "무지게" → "라고"
export const iraGo = (word: string) => (hasBatchim(word) ? "이라고" : "라고");

// "영수증" → "이야", "소방차" → "야"
export const iya = (word: string) => (hasBatchim(word) ? "이야" : "야");
