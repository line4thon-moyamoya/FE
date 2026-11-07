import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-neutral-100">
      {/* 모든 화면이 쓰는 기기 틀. 겹침 요소의 기준이자 잘라내는 곳 */}
      <div className="relative h-[874px] w-[402px] overflow-hidden bg-cream">
        <Outlet />
      </div>
    </div>
  );
}
