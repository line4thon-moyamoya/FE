interface NoteIconProps {
  /** 한 변의 길이(px) */
  size: number;
}

/** 음표. 쓰이는 자리마다 색이 달라 currentColor 를 따라감 */
export default function NoteIcon({ size }: NoteIconProps) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        d="M7.5 14.5835V5.16683L15.8333 3.3335V12.7502"
        stroke="currentColor"
        strokeWidth="2.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="5.333" cy="14.833" rx="2.75" ry="2.333" fill="currentColor" />
      <ellipse cx="13.667" cy="12.833" rx="2.75" ry="2.333" fill="currentColor" />
    </svg>
  );
}
