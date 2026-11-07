let current: HTMLAudioElement | null = null;

/** 재생 중인 소리를 멈춤 */
export const stopAudio = () => {
  current?.pause();
  current = null;
};

/**
 * 서버가 준 음성을 재생한다.
 * 앞서 재생하던 소리는 멈춘다.
 */
export const playAudio = (src: string) => {
  stopAudio();
  const audio = new Audio(src);
  current = audio;
  // 자동 재생이 막히는 경우가 있어 실패해도 화면은 계속 진행
  void audio.play().catch(() => {});
  return audio;
};

/** Base64 로 받은 음성을 재생한다 */
export const playAudioBase64 = (
  base64: string,
  contentType = "audio/wav",
) => playAudio(`data:${contentType};base64,${base64}`);

/**
 * URL 이 있으면 URL 로, 없으면 Base64 로 재생한다.
 * 서버가 둘 중 하나만 채워 주기 때문.
 */
export const playVoice = (voice: {
  audioUrl?: string | null;
  audioBase64?: string | null;
  audioContentType?: string | null;
}) => {
  if (voice.audioUrl) return playAudio(voice.audioUrl);
  if (voice.audioBase64) {
    return playAudioBase64(voice.audioBase64, voice.audioContentType ?? undefined);
  }
  return null;
};
