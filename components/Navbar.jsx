"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const isActive = (href) => (href === "/" ? pathname === "/" || pathname.startsWith("/workout") : pathname === href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={28} height={28} />
          <span className="font-display text-xl font-bold tracking-wider">FITLOG</span>
        </Link>

        <nav className="order-3 flex w-full justify-center gap-8 md:order-none md:w-auto">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`border-b-2 pb-1 text-sm font-semibold transition-colors ${
                isActive(l.href) ? "border-accent text-accent" : "border-transparent text-soft hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 text-xs font-bold">
          <Link href="/my-plan" className="rounded-full bg-accent px-3 py-1 text-black">
            Plan {plan.length}
          </Link>
          <Link href="/my-plan" className="rounded-full border border-soft px-3 py-1 text-soft hover:text-white">
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </header>
  );
}
