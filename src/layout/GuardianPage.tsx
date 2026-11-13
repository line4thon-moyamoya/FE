import type { ReactNode } from "react";

import BackButton from "../components/common/BackButton/BackButton";

interface GuardianPageProps {
  /** 상단 제목 */
  title: string;
  children: ReactNode;
}

/**
 * 보호자 모드 화면들이 함께 쓰는 껍데기.
 * 배경과 뒤로가기 버튼, 제목을 여기서 한 번만 그린다.
 *
 * 보호자 홈과 비밀번호 화면은 상단 생김새가 달라 쓰지 않는다.
 */
export default function GuardianPage({ title, children }: GuardianPageProps) {
  return (
    <main className="pt-status flex h-full w-full flex-col bg-guardian">
      <header className="flex shrink-0 items-center gap-2.5 px-6 py-1.5">
        <BackButton />
        <h1 className="font-jua text-[21px] leading-[1.35] font-normal text-ink">
          {title}
        </h1>
      </header>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">{children}</div>
    </main>
  );
}
