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

/** 한글 단어 -> 아이콘 파일 이름 */
const WORD_SLUGS: Record<string, string> = {
  감지하다: "detect",
  경제: "economy",
  공구: "tool",
  공평하다: "fair",
  관리비: "maintenance-fee",
  국정감사: "state-audit",
  국회의원: "lawmaker",
  권리: "rights",
  기본: "basic",
  기자: "reporter",
  단풍: "autumn-leaves",
  미세먼지: "fine-dust",
  배신: "betrayal",
  법원: "court",
  보일러: "boiler",
  분리수거: "separate-recycling",
  삼겹살: "pork-belly",
  선거: "election",
  세금: "tax",
  소방차: "fire-truck",
  수리기사: "repair-technician",
  시청: "city-hall",
  어슬렁거리다: "loiter",
  연고: "ointment",
  영수증: "receipt",
  용감: "brave",
  용기: "courage",
  월급: "salary",
  이자: "interest",
  재판: "trial",
  재활용: "recycling",
  적금: "savings",
  적응: "adapt",
  정부: "government",
  정수기: "water-purifier",
  주식: "stock",
  증권: "securities",
  지혜: "wisdom",
  차츰차츰: "gradually",
  초록색: "green",
  층간소음: "floor-noise",
  콘센트: "outlet",
  "터를 잡다": "settle",
  통장: "bankbook",
  투표: "vote",
  품절: "sold-out",
  할부: "installment",
  할인: "discount",
  환기: "ventilation",
  환불: "refund",
  회의: "meeting",
};

/** 아이콘이 있는 단어 목록 */
export const WORD_LIST = Object.keys(WORD_SLUGS);

/** 한글 단어로 아이콘 주소를 찾음. 없으면 undefined */
export function getWordIcon(word: string): string | undefined {
  const slug = WORD_SLUGS[word];
  return slug ? iconUrl(slug) : undefined;
}
