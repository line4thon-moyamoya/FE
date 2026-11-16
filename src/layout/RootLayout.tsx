import { Outlet, useLocation } from "react-router-dom";

export default function RootLayout() {
  const { pathname } = useLocation();
  // 보호자 모드만 배경색이 다르다. 콘텐츠 틀 바깥까지 같은 색으로 채우려고 여기서 고른다.
  const background = pathname.startsWith("/guardian") ? "bg-guardian" : "bg-cream";

  return (
    <div className={`flex h-dvh w-full items-center justify-center ${background}`}>
      {/*
        앱 프레임. 배경은 위에서 화면을 꽉 채우고 여기서는 크기만 제한한다.
        화면이 설계 높이보다 크면 가운데에 두고, 작으면 화면에 맞춘다.
        겹침 요소(시트·모달)의 기준점이기도 하다.
      */}
      <div className="relative h-dvh max-h-[874px] w-full max-w-content overflow-hidden">
        {/* 화면 전체 스크롤 영역. 자기 안에서 더 쪼개 쓰는 화면은 h-full 을 쓴다 */}
        <div className="absolute inset-0 overflow-y-auto overscroll-contain">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
