import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-neutral-100">
      <div className="relative h-[874px] w-[402px] bg-cream">
        <Outlet />
      </div>
    </div>
  );
}
