"use client";
import { Icon } from "./Icons";
import { usePlan } from "@/context/PlanContext";

export default function Toast() {
  const { toast } = usePlan();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      {toast && (
        <div
          key={toast.id}
          className="flex items-center gap-2 rounded-lg border border-line bg-panel-2 px-4 py-3 text-sm font-medium shadow-xl"
        >
          {toast.type === "warn" ? <Icon name="Info" size={18} className="text-amber-400" /> : <Icon name="CheckCircle2" size={18} className="text-accent" />}
          {toast.message}
        </div>
      )}
    </div>
  );
}
