import { Clock, Flame, Star } from "lucide-react";

export default function Stats({ w, className = "" }) {
  return (
    <div className={`flex items-center gap-4 text-sm text-soft ${className}`}>
      <span className="flex items-center gap-1.5"><Clock size={15} className="text-accent" />{w.duration} min</span>
      <span className="flex items-center gap-1.5"><Flame size={15} className="text-accent" />{w.calories} kcal</span>
      <span className="flex items-center gap-1.5"><Star size={15} className="text-accent" />{w.rating}</span>
    </div>
  );
}
