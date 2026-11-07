export type MicPermissionResult = "granted" | "denied" | "unsupported";

export const requestMicPermission = async (): Promise<MicPermissionResult> => {
  // 마이크를 쓸 수 없는 환경 (오래된 브라우저, http 주소 등)
  if (!navigator.mediaDevices?.getUserMedia) return "unsupported";

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // 권한 확인만 하고 마이크는 바로 끄기
    stream.getTracks().forEach((track) => track.stop());
    return "granted";
  } catch (err) {
    if (err instanceof DOMException && err.name === "NotAllowedError") {
      return "denied";
    }
    // 마이크 장치가 없거나 다른 앱이 쓰는 중 등
    return "unsupported";
  }
};
