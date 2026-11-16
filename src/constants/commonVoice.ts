import meanings2 from "../assets/audio/2-4a.mp3";
import meanings1 from "../assets/audio/2-4c.mp3";

/**
 * 서버가 주지 않는 공통 대사. 화면마다 늘 같은 말이라 파일로 들고 있는다.
 * 키는 피그마 화면 번호를 그대로 쓴다.
 */
export const COMMON_VOICE = {
  /** 다른 뜻 2개: "둘 중에 더 가까운 게 뭐야?" */
  "2-4a": meanings2,
  /** 다른 뜻 1개: "혹시 이 뜻이야?" */
  "2-4c": meanings1,
};
