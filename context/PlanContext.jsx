"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const PlanContext = createContext(null);
const KEY = "fitlog:v1";
export const PLAN_CAP = 5;

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (Array.isArray(data.plan)) setPlan(data.plan);
      if (Array.isArray(data.saved)) setSaved(data.saved);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify({ plan, saved }));
  }, [plan, saved, ready]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const notify = useCallback((message, type = "ok") => setToast({ message, type, id: Date.now() }), []);

  const inPlan = (id) => plan.some((w) => w.id === id);
  const isSaved = (id) => saved.some((w) => w.id === id);
  const planFull = plan.length >= PLAN_CAP;

  const addToPlan = (w) => {
    if (inPlan(w.id)) return notify("Already in today's plan", "warn");
    if (planFull) return notify(`Plan is full — ${PLAN_CAP} lifts max`, "warn");
    setPlan((p) => [...p, { ...w, done: false }]);
    notify("Added to today's plan");
  };
  const saveForLater = (w) => {
    if (isSaved(w.id)) return notify("Already saved", "warn");
    setSaved((s) => [...s, w]);
    notify("Saved for later");
  };
  const removeFromPlan = (id) => {
    setPlan((p) => p.filter((w) => w.id !== id));
    notify("Removed from today's plan");
  };
  const removeFromSaved = (id) => {
    setSaved((s) => s.filter((w) => w.id !== id));
    notify("Removed from saved");
  };
  const markDone = (id) => {
    setPlan((p) => p.map((w) => (w.id === id ? { ...w, done: true } : w)));
    notify("Marked as done");
  };

  return (
    <PlanContext.Provider
      value={{ plan, saved, ready, toast, inPlan, isSaved, planFull, addToPlan, saveForLater, removeFromPlan, removeFromSaved, markDone }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);
