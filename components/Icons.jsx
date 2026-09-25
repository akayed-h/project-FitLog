const paths = {
  ArrowDown: <path d="M12 5v14m-7-7 7 7 7-7" />,
  ArrowLeft: <path d="m12 19-7-7 7-7M5 12h14" />,
  Bookmark: <path d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-4-6 4z" />,
  Check: <path d="m5 12 4 4L19 6" />,
  CheckCircle2: <><circle cx="12" cy="12" r="10" /><path d="m8 12 2.5 2.5L16 9" /></>,
  ChevronDown: <path d="m6 9 6 6 6-6" />,
  Clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  Flame: <path d="M8.5 14.5c0 2 1.5 3.5 3.5 3.5s3.5-1.5 3.5-3.5c0-1.5-1-2.5-2-3.5-.5 2-2 2.5-2 2.5 1-3-1-6-4-8 .5 3-2 5-2 8a6.5 6.5 0 0 0 13 0c0-2-1-4-3-6" />,
  Info: <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4m0-4h.01" /></>,
  Plus: <path d="M12 5v14m-7-7h14" />,
  Search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></>,
  Star: <path d="m12 3 2.75 5.58 6.16.9-4.45 4.34 1.05 6.13L12 17.06l-5.51 2.89 1.05-6.13-4.45-4.34 6.16-.9z" />,
  X: <path d="m18 6-12 12M6 6l12 12" />,
};

export function Icon({ name, size = 24, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
