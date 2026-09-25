import Image from "next/image";
import { Icon } from "./Icons";

export default function Hero() {
  return (
    <section className="grid items-center gap-8 py-12 md:grid-cols-2 md:py-20">
      <div>
        <p className="mb-3 text-xs font-bold tracking-[0.2em] text-accent">WORKOUT LIBRARY</p>
        <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
          Train with intent. Log every set.
        </h1>
        <p className="mt-5 max-w-lg text-soft">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase text-black transition hover:brightness-90"
        >
          Browse workouts <Icon name="ArrowDown" size={18} />
        </a>
      </div>
      <div className="flex justify-center rounded-2xl border border-line bg-panel p-6">
        <Image src="/banner.png" alt="Athlete on a preacher curl machine" width={334} height={334} priority className="h-auto w-full max-w-sm" />
      </div>
    </section>
  );
}
