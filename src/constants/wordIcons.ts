import wordDefault from "../assets/images/word-default.svg";

/**
 * 단어 아이콘 모음.
 *
 * 파일은 영어 이름으로 두고, 화면에 쓰는 한글 단어로 찾을 수 있게 표를 둠.
 * 아이콘을 추가할 때는 words/ 에 svg 를 넣고 아래 표에 한 줄만 더하면 됨.
 */

const ICON_URLS = import.meta.glob("../assets/icons/words/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function iconUrl(slug: string): string {
  return ICON_URLS[`../assets/icons/words/${slug}.svg`];
}

/** 아이콘도 서버 이미지도 없는 단어에 쓰는 기본 그림 */
export const WORD_DEFAULT_IMAGE = wordDefault;

/** 한글 단어 -> 아이콘 파일 이름 */
const WORD_SLUGS: Record<string, string> = {
  가뭄: "drought",
  가정통신문: "school-newsletter",
  감지하다: "detect",
  견학: "field-trip",
  경제: "economy",
  고속도로: "highway",
  고집: "stubbornness",
  공구: "tool",
  공평하다: "fair",
  관리비: "maintenance-fee",
  교통체증: "traffic-jam",
  구독: "subscription",
  국정감사: "state-audit",
  국회의원: "lawmaker",
  권리: "rights",
  기온: "temperature",
  기자: "reporter",
  깁스: "cast",
  내비게이션: "navigation",
  눈치: "tact",
  단풍: "autumn-leaves",
  담임: "homeroom-teacher",
  데이터: "data",
  동료: "coworker",
  등원: "going-to-school",
  로그인: "login",
  마감: "deadline",
  매표소: "ticket-office",
  면역력: "immunity",
  면접: "interview",
  미세먼지: "fine-dust",
  받아쓰기: "dictation",
  배려: "consideration",
  배신: "betrayal",
  배터리: "battery",
  법원: "court",
  보일러: "boiler",
  분리수거: "separate-recycling",
  비밀번호: "password",
  비염: "rhinitis",
  삼겹살: "pork-belly",
  상담: "counseling",
  선거: "election",
  세금: "tax",
  소독: "disinfection",
  소방차: "fire-truck",
  수리기사: "repair-technician",
  습도: "humidity",
  승진: "promotion",
  시청: "city-hall",
  알레르기: "allergy",
  알림장: "notice-book",
  야근: "overtime",
  양보: "yielding",
  어슬렁거리다: "loiter",
  억울하다: "unfair-feeling",
  업데이트: "update",
  여권: "passport",
  연고: "ointment",
  연차: "annual-leave",
  영수증: "receipt",
  예방접종: "vaccination",
  예의: "manners",
  오해: "misunderstanding",
  와이파이: "wifi",
  용감: "brave",
  용기: "courage",
  월급: "salary",
  응급실: "emergency-room",
  이자: "interest",
  인공지능: "ai",
  일기예보: "weather-forecast",
  입원: "hospitalization",
  입학식: "entrance-ceremony",
  장마: "rainy-season",
  재택근무: "remote-work",
  재판: "trial",
  재활용: "recycling",
  적금: "savings",
  적응: "adapt",
  정부: "government",
  정수기: "water-purifier",
  존댓말: "honorific",
  주식: "stock",
  주유소: "gas-station",
  증권: "securities",
  지진: "earthquake",
  지혜: "wisdom",
  질투: "jealousy",
  차츰차츰: "gradually",
  처방전: "prescription",
  체온계: "thermometer",
  초록색: "green",
  출장: "business-trip",
  충전: "charging",
  층간소음: "floor-noise",
  콘센트: "outlet",
  태풍: "typhoon",
  "터를 잡다": "settle",
  터미널: "terminal",
  통장: "bankbook",
  퇴근: "leaving-work",
  투표: "vote",
  폭염: "heat-wave",
  품절: "sold-out",
  하원: "leaving-school",
  학부모: "parent",
  할부: "installment",
  할인: "discount",
  화상통화: "video-call",
  환기: "ventilation",
  환불: "refund",
  환승: "transfer",
  황사: "yellow-dust",
  회식: "company-dinner",
  회의: "meeting",
  횡단보도: "crosswalk",
  후회: "regret",
  휴게소: "rest-area",
};

/** 아이콘이 있는 단어 목록 */
export const WORD_LIST = Object.keys(WORD_SLUGS);

/** 한글 단어로 아이콘 주소를 찾음. 없으면 undefined */
export function getWordIcon(word: string): string | undefined {
  const slug = WORD_SLUGS[word];
  return slug ? iconUrl(slug) : undefined;
}

/**
 * 서버가 준 그림 주소 -> 내장 아이콘 -> 기본 그림 순으로 고른다.
 *
 * 서버가 그림이 없는 단어에 `/images/default-word.png` 같은 자기 쪽 경로를 주는 경우가 있는데,
 * 그대로 쓰면 우리 도메인에서 404 가 나 깨진 그림이 뜬다. 그래서 바로 쓸 수 있는 주소만 받는다.
 */
export function getWordImage(
  imageUrl: string | null | undefined,
  word: string,
): string {
  const usable = imageUrl && /^(https?:|data:|blob:)/.test(imageUrl);
  return (usable ? imageUrl : undefined) ?? getWordIcon(word) ?? WORD_DEFAULT_IMAGE;
}
