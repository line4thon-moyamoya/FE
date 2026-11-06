import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import ChildHeader from "../components/common/ChildHeader/ChildHeader";
import CouponSheet from "../components/Child/CouponSheet";
import Footer from "../components/common/Footer/Footer";
import { ChildModeContext } from "../contexts/ChildModeContext";
import { findChildProfile } from "../mocks/child";
import { getCurrentChildId } from "../utils/currentChild";

/**
 * 아이 모드 화면들이 함께 사용
 */
export default function ChildLayout() {
  const navigate = useNavigate();
  const child = findChildProfile(getCurrentChildId());

  const [coupons, setCoupons] = useState(child.coupons);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <ChildModeContext
      value={{
        child,
        coupons,
        setCoupons,
        openCouponSheet: () => setSheetOpen(true),
      }}
    >
      <main className="relative flex h-full flex-col overflow-hidden bg-cream pt-[62px] pb-[113px]">
        <ChildHeader
          childName={child.name}
          coupons={coupons}
          onCouponClick={() => setSheetOpen(true)}
          onGuardianClick={() => navigate("/guardian/password")}
        />

        <Outlet />

        <Footer />

        {sheetOpen && (
          <CouponSheet
            coupons={coupons}
            onStart={() => {
              setSheetOpen(false);
              // 홈이 아닌 화면에서 눌렀어도 홈으로 가서 바로 듣기 시작
              navigate("/home", { state: { startListening: true } });
            }}
            onClose={() => setSheetOpen(false)}
          />
        )}
      </main>
    </ChildModeContext>
  );
}
