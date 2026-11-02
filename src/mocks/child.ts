import type { ChildProfile } from "../types/child";

const DEFAULT_GREETING = "안녕! 나는 모야야.\n궁금한 말 물어봐!";

export const MOCK_CHILD_PROFILES: ChildProfile[] = [
  {
    id: 1,
    name: "지우",
    look: "car",
    coupons: 2,
    greeting: DEFAULT_GREETING,
  },
  {
    id: 2,
    name: "서연",
    look: "princess",
    coupons: 4,
    greeting: DEFAULT_GREETING,
  },
];

/** 저장된 아이 id 로 찾고, 없으면 첫 번째 아이 */
export function findChildProfile(id: number | null): ChildProfile {
  return MOCK_CHILD_PROFILES.find((c) => c.id === id) ?? MOCK_CHILD_PROFILES[0];
}
