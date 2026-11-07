import { useLocation, useNavigate } from "react-router-dom";

import moyaActive from "../../../assets/icons/footer/moya_active.svg";
import moyaInactive from "../../../assets/icons/footer/moya_inactive.svg";
import notebookActive from "../../../assets/icons/footer/notebook_active.svg";
import notebookInactive from "../../../assets/icons/footer/notebook_inactive.svg";
import noteActive from "../../../assets/icons/footer/note_active.svg";
import noteInactive from "../../../assets/icons/footer/note_inactive.svg";

const OPTIONS = [
  { label: "모야", path: "/home", activeIcon: moyaActive, inactiveIcon: moyaInactive },
  { label: "단어 수첩", path: "/notebook", activeIcon: notebookActive, inactiveIcon: notebookInactive },
  { label: "단어 노래", path: "/song", activeIcon: noteActive, inactiveIcon: noteInactive },
];

export default function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[402px] h-[113px] pt-3 px-5 pb-11 bg-white rounded-t-3xl shadow-[0px_-6px_24px_0px_rgba(91,69,200,0.10),0px_-1px_0px_0px_rgba(185,169,138,0.12)]">
      <ul className="flex justify-around items-start h-full">
        {OPTIONS.map(({ label, path, activeIcon, inactiveIcon }) => {
          const isActive = pathname.startsWith(path);

          return (
            <li key={path}>
              <button
                type="button"
                onClick={() => navigate(path)}
                aria-current={isActive ? "page" : undefined}
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <span
                  className={`flex items-center justify-center w-[56px] h-[34px] rounded-2xl ${
                    isActive ? "bg-[#EEEAFF]" : ""
                  }`}
                >
                  <img
                    src={isActive ? activeIcon : inactiveIcon}
                    alt=""
                    className="w-6 h-6"
                  />
                </span>
                <span
                  className={`text-xs font-bold font-noto ${
                    isActive ? "text-[#241F48]" : "text-[#9E98BF]"
                  }`}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}