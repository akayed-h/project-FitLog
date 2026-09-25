"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { searchWorkouts, sortWorkouts, SORT_OPTIONS } from "@/lib/api";
import { Spinner } from "./Library";
import Thumb from "./Thumb";
import Stats from "./Stats";

export default function PlanView() {
  const { plan, saved, ready, removeFromPlan, removeFromSaved, markDone, addToPlan, inPlan, planFull } = usePlan();
  const [tab, setTab] = useState("plan");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("Duration");

  const list = tab === "plan" ? plan : saved;
  const visible = useMemo(() => sortWorkouts(searchWorkouts(list, query), sortBy), [list, query, sortBy]);

  const metrics = [
    ["Exercises", plan.length],
    ["Minutes", plan.reduce((s, w) => s + w.duration, 0)],
    ["Calories", plan.reduce((s, w) => s + w.calories, 0)],
  ];

  return (
    <div className="py-10">
      <h1 className="font-display text-4xl font-bold uppercase">My Plan</h1>
      <p className="mt-1 text-soft">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {metrics.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-line bg-panel p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">{label}</p>
            <p className="mt-1 font-display text-4xl font-bold text-accent">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="tablist" className="inline-flex rounded-lg border border-line bg-panel p-1">
          {[["plan", `Today's Plan (${plan.length})`], ["saved", `Saved (${saved.length})`]].map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`rounded-md px-4 py-2 text-sm font-bold transition ${tab === k ? "bg-accent text-black" : "text-soft hover:text-white"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name or muscle"
              aria-label="Search this list"
              className="w-full rounded-md border border-line bg-panel py-2 pl-9 pr-3 text-sm placeholder:text-muted sm:w-56"
            />
          </label>
          <label className="relative flex items-center gap-2 text-sm text-soft">
            Sort by
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none rounded-md border border-line bg-panel py-2 pl-3 pr-9 text-white">
              {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 text-muted" />
          </label>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {!ready ? (
          <Spinner />
        ) : list.length === 0 ? (
          <div className="rounded-xl border border-line bg-panel px-6 py-16 text-center">
            <h2 className="font-display text-2xl font-bold uppercase">Nothing here yet</h2>
            <p className="mt-2 text-soft">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="mt-6 inline-block rounded-md bg-accent px-6 py-3 text-sm font-bold text-black">Go to workouts</Link>
          </div>
        ) : visible.length === 0 ? (
          <p className="py-10 text-center text-soft">No matches for &ldquo;{query}&rdquo;.</p>
        ) : (
          visible.map((w) => (
            <article key={w.id} className={`flex flex-col gap-4 rounded-xl border border-line bg-panel p-4 sm:flex-row sm:items-center ${w.done ? "opacity-70" : ""}`}>
              <Thumb src={w.image} alt={w.name} className="h-24 w-full shrink-0 rounded-lg sm:w-24" />
              <div className="flex-1">
                <h3 className={`font-display text-xl font-bold uppercase ${w.done ? "line-through" : ""}`}>{w.name}</h3>
                <p className="text-sm text-muted">{w.equipment}</p>
                <Stats w={w} className="mt-2" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/workout/${w.id}`} className="rounded-md border border-soft px-4 py-2 text-sm font-bold hover:border-accent hover:text-accent">
                  View Details
                </Link>
                {tab === "plan" ? (
                  <button
                    onClick={() => markDone(w.id)}
                    disabled={w.done}
                    className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-bold text-black disabled:opacity-50"
                  >
                    <Check size={16} /> {w.done ? "Done" : "Mark as Done"}
                  </button>
                ) : (
                  <button
                    onClick={() => addToPlan(w)}
                    disabled={inPlan(w.id) || planFull}
                    className="rounded-md bg-accent px-4 py-2 text-sm font-bold text-black disabled:opacity-40"
                  >
                    {inPlan(w.id) ? "In plan" : "Add to plan"}
                  </button>
                )}
                <button
                  onClick={() => (tab === "plan" ? removeFromPlan(w.id) : removeFromSaved(w.id))}
                  aria-label={`Remove ${w.name}`}
                  className="rounded-md border border-line p-2 text-soft hover:border-red-400 hover:text-red-400"
                >
                  <X size={18} />
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
