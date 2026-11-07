import { Navigate, useParams } from "react-router-dom";

import { MOCK_CHILD_LIST } from "../mocks/guardian";
import type { Child } from "../types/guardian";

type Result =
  | { child: Child; redirect: null }
  | { child: null; redirect: React.ReactElement };

/**
 * 주소의 childId 로 아이를 찾는다.
 * 없는 아이면 redirect 가 채워지므로, 화면은 그걸 그대로 반환하면 된다.
 *
 *   const { child, redirect } = useChildByParam();
 *   if (redirect) return redirect;
 *
 * API 연동은 이 파일만 고치면 된다.
 */
export default function useChildByParam(fallback = "/guardian"): Result {
  const { childId } = useParams();
  const child = MOCK_CHILD_LIST.find((c) => c.id === Number(childId));

  if (!child) {
    return { child: null, redirect: <Navigate to={fallback} replace /> };
  }
  return { child, redirect: null };
}
