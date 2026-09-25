export default function Tags({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span key={t} className="rounded-full border border-accent/40 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent">
          {t}
        </span>
      ))}
    </div>
  );
}
