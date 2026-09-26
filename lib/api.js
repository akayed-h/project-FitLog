const BASE = "https://api.abcz.workers.dev/api/fitlog";

const toList = (v) =>
  Array.isArray(v) ? v.map(String) : typeof v === "string" && v ? v.split(",").map((s) => s.trim()) : [];
const toNum = (v) => {
  const n = parseFloat(String(v ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

export function normalize(raw = {}) {
  const steps = raw.instructions ?? raw.steps ?? [];
  return {
    id: String(raw.id ?? raw._id ?? raw.slug ?? ""),
    name: raw.name ?? raw.title ?? "Untitled workout",
    description: raw.description ?? raw.summary ?? "",
    categories: toList(raw.categories ?? raw.category ?? raw.tags ?? raw.muscleGroups),
    equipment: toList(raw.equipment).join(", "),
    difficulty: raw.difficulty ?? raw.level ?? "",
    sets: raw.sets ?? "",
    reps: raw.reps ?? "",
    duration: toNum(raw.duration ?? raw.durationMinutes),
        calories: toNum(raw.caloriesBurned ?? raw.calories ?? raw.kcal),
    rating: toNum(raw.rating),
    image: raw.image ?? raw.img ?? raw.thumbnail ?? raw.imageUrl ?? raw.illustration ?? "",
    instructions: (Array.isArray(steps) ? steps : String(steps).split("\n"))
      .map((s) => (typeof s === "string" ? s : s?.text ?? s?.step ?? ""))
      .filter(Boolean),
  };
}

export async function fetchWorkouts() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const json = await res.json();
  const list = Array.isArray(json)
    ? json
    : json.data ?? json.workouts ?? json.fitlog ?? json.items ?? Object.values(json);
  return list.map(normalize);
}

export async function fetchWorkout(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error(res.status === 404 ? "not-found" : `Request failed (${res.status})`);
  const json = await res.json();
  return normalize(json.data ?? json.workout ?? json);
}

export const SORT_OPTIONS = ["Duration", "Calories", "Rating"];

export function sortWorkouts(list, by) {
  const key = by.toLowerCase();
  return [...list].sort((a, b) => b[key] - a[key]);
}

export function searchWorkouts(list, q) {
  const s = q.trim().toLowerCase();
  if (!s) return list;
  return list.filter((w) => w.name.toLowerCase().includes(s) || w.categories.some((c) => c.toLowerCase().includes(s)));
}
