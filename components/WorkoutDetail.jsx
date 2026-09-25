"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "./Icons";
import { fetchWorkout } from "@/lib/api";
import { usePlan, PLAN_CAP } from "@/context/PlanContext";
import { Spinner } from "./Library";
import Tags from "./Tags";
import Thumb from "./Thumb";
import NotFoundView from "./NotFoundView";

export default function WorkoutDetail({ id }) {
  const [w, setW] = useState(null);
  const [status, setStatus] = useState("loading");
  const { addToPlan, saveForLater, inPlan, planFull } = usePlan();

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetchWorkout(id)
      .then((d) => { if (!cancelled) { setW(d); setStatus(d.id || d.name ? "ok" : "missing"); } })
      .catch((e) => !cancelled && setStatus(e.message === "not-found" ? "missing" : "error"));
    return () => { cancelled = true; };
  }, [id]);

  if (status === "loading") return <Spinner label="Loading workout…" />;
  if (status === "missing") return <NotFoundView />;
  if (status === "error") return <p className="py-24 text-center text-soft">Couldn&apos;t load this workout. Check your connection and reload.</p>;

  const added = inPlan(w.id);
  const specs = [
    ["Equipment", w.equipment], ["Difficulty", w.difficulty], ["Sets", w.sets], ["Reps", w.reps],
    ["Duration", `${w.duration} min`], ["Calories", `${w.calories} kcal`], ["Rating", w.rating],
  ];

  return (
    <div className="py-8">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-soft hover:text-white">
        <Icon name="ArrowLeft" size={16} /> Back to library
      </Link>
      <div className="grid gap-8 lg:grid-cols-2">
        <Thumb src={w.image} alt={w.name} className="aspect-square rounded-2xl border border-line lg:sticky lg:top-24 lg:self-start" />
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-display text-4xl font-bold uppercase">{w.name}</h1>
            <p className="mt-3 text-soft">{w.description}</p>
          </div>
          <Tags items={w.categories} />

          <dl className="divide-y divide-line rounded-xl border border-line bg-panel">
            {specs.map(([k, v]) => (
              <div key={k} className="flex justify-between px-5 py-3 text-sm">
                <dt className="font-bold uppercase tracking-wide text-muted">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase">Instructions</h2>
            <ol className="space-y-3">
              {w.instructions.map((s, i) => (
                <li key={i} className="flex gap-4 text-soft">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-black">{i + 1}</span>
                  <span className="pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToPlan(w)}
              disabled={added || planFull}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold text-black transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Icon name="Plus" size={18} />
              {added ? "In today's plan" : planFull ? `Plan full (${PLAN_CAP}/${PLAN_CAP})` : "Add to today's plan"}
            </button>
            <button
              onClick={() => saveForLater(w)}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-soft px-6 py-3 text-sm font-bold text-white transition hover:border-accent hover:text-accent"
            >
              <Icon name="Bookmark" size={18} /> Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
