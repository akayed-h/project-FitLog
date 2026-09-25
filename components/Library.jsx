"use client";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { fetchWorkouts, searchWorkouts, sortWorkouts, SORT_OPTIONS } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";

export function Spinner({ label = "Loading workouts…" }) {
  return (
    <div role="status" className="flex flex-col items-center gap-4 py-16 text-soft">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" />
      <span>{label}</span>
    </div>
  );
}

export default function Library() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("Duration");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchWorkouts()
      .then((d) => !cancelled && setWorkouts(d))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [attempt]);

  const visible = useMemo(() => sortWorkouts(searchWorkouts(workouts, query), sortBy), [workouts, query, sortBy]);

  return (
    <section id="library" className="scroll-mt-20 pb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase">The Library</h2>
          <p className="mt-1 text-soft">Twelve lifts covering every major muscle group.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name or muscle"
              aria-label="Search workouts"
              className="w-full rounded-md border border-line bg-panel py-2 pl-9 pr-3 text-sm placeholder:text-muted sm:w-56"
            />
          </label>
          <label className="relative flex items-center gap-2 text-sm text-soft">
            Sort by
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-md border border-line bg-panel py-2 pl-3 pr-9 text-white"
            >
              {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 text-muted" />
          </label>
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <>
            <Spinner />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-72 animate-pulse rounded-xl bg-panel" />)}
            </div>
          </>
        ) : error ? (
          <div className="rounded-xl border border-line bg-panel p-10 text-center">
            <p className="text-soft">Couldn&apos;t load workouts: {error}</p>
            <button onClick={() => setAttempt((a) => a + 1)} className="mt-4 rounded-md bg-accent px-5 py-2 text-sm font-bold text-black">
              Try again
            </button>
          </div>
        ) : visible.length === 0 ? (
          <p className="py-16 text-center text-soft">No workouts match &ldquo;{query}&rdquo;.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((w) => <WorkoutCard key={w.id} w={w} />)}
          </div>
        )}
      </div>
    </section>
  );
}
