import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";

import ChildHeader from "../components/common/ChildHeader/ChildHeader";
import CouponSheet from "../components/Child/CouponSheet";
import Footer from "../components/common/Footer/Footer";
import { ChildModeContext } from "../contexts/ChildModeContext";
import { getChildHome, type ChildHome } from "../api/childHome";

/**
 * 아이 모드 화면들이 함께 쓰는 껍데기.
 * 헤더와 탭바, 바깥 여백을 여기서 한 번만 그린다.
 * 아이 정보도 여기서 한 번만 불러와 하위 화면이 같은 값을 본다.
 */
export default function ChildLayout() {
  const navigate = useNavigate();
  const { childId } = useParams();
  const id = Number(childId);

  const [child, setChild] = useState<ChildHome | null>(null);
  const [failed, setFailed] = useState(false);
  const [coupons, setCoupons] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (!Number.isInteger(id)) return;

    let alive = true;
    getChildHome(id)
      .then((data) => {
        if (!alive) return;
        setChild(data);
        setCoupons(data.coupons);
      })
      .catch(() => alive && setFailed(true));

    return () => {
      alive = false;
    };
  }, [id]);

  // 주소에 아이 id 가 없거나 이상하면 보호자 홈으로
  if (!Number.isInteger(id)) return <Navigate to="/guardian" replace />;

  if (failed) {
    return (
      <main className="pt-status flex h-full flex-col items-center justify-center bg-cream px-6">
        <p className="text-center font-jua text-xl text-ink">
          잠깐 문제가 생겼어.
          <br />
          다시 들어와 줄래?
        </p>
      </main>
    );
  }

  // 아이 정보가 오기 전에는 껍데기만 보여 줌
  if (!child) {
    return <main className="pt-status h-full bg-cream" aria-busy />;
  }

  return (
    <ChildModeContext
      value={{
        child,
        coupons,
        setCoupons,
        openCouponSheet: () => setSheetOpen(true),
        childPath: (to) => `/children/${id}/${to}`,
      }}
    >
      <main className="pt-status flex h-full flex-col bg-cream">
        <ChildHeader
          childName={child.nickname}
          coupons={coupons}
          onCouponClick={() => setSheetOpen(true)}
          onGuardianClick={() => navigate("/guardian/password")}
        />

        {/* 본문만 스크롤한다. 헤더와 탭바는 프레임에 붙어 있는다 */}
        <div className="flex min-h-0 flex-1 flex-col">
          <Outlet />
        </div>

        <Footer basePath={`/children/${id}`} />

        {sheetOpen && (
          <CouponSheet
            coupons={coupons}
            onStart={() => {
              setSheetOpen(false);
              navigate(`/children/${id}/home`, {
                state: { startListening: true },
              });
            }}
            onClose={() => setSheetOpen(false)}
          />
        )}
      </main>
    </ChildModeContext>
  );
}
