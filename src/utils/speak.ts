// 문장을 브라우저 음성 합성으로 읽어 주기
export const speak = (text: string) => {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text.replace(/\n/g, " "));
  utterance.lang = "ko-KR";
  window.speechSynthesis.speak(utterance);
};