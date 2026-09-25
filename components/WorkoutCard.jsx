import Link from "next/link";
import Thumb from "./Thumb";
import Tags from "./Tags";
import Stats from "./Stats";

export default function WorkoutCard({ w }) {
  return (
    <Link
      href={`/workout/${w.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-panel transition hover:border-accent/60"
    >
      <Thumb src={w.image} alt={w.name} className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Tags items={w.categories} />
        <h3 className="font-display text-xl font-bold uppercase tracking-wide">{w.name}</h3>
        <p className="text-sm text-muted">{w.equipment}</p>
        <Stats w={w} className="mt-auto border-t border-line pt-3" />
      </div>
    </Link>
  );
}
