import type { Child } from "../../types/guardian";

interface ChildTabProps {
  childList: Pick<Child, "id" | "name">[];
  selectedId: number;
  onSelect: (id: number) => void;
}

export default function ChildTab({
  childList,
  selectedId,
  onSelect,
}: ChildTabProps) {
  return (
    <div className="-mx-6 flex gap-2 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {childList.map(({ id, name }) => {
        const isSelected = id === selectedId;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            aria-pressed={isSelected}
            className={`cursor-pointer py-2 px-[18px] flex shrink-0 justify-center items-center h-9 min-w-[62px] rounded-[999px] font-jua whitespace-nowrap text-base font-normal ${
              isSelected
                ? "bg-[#6A4FF3] text-white"
                : "bg-white text-[#6F6A8C] border-[1.5px] border-[#E2DFEA]"
            }`}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
