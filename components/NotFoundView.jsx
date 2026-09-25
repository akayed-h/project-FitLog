import Link from "next/link";

export default function NotFoundView() {
  return (
    <div className="flex flex-col items-center py-28 text-center">
      <p className="font-display text-8xl font-bold text-accent">404</p>
      <h1 className="mt-2 font-display text-3xl font-bold uppercase">Rep not found</h1>
      <p className="mt-2 max-w-sm text-soft">That page doesn&apos;t exist. Head back to the library and pick a lift.</p>
      <Link href="/" className="mt-6 rounded-md bg-accent px-6 py-3 text-sm font-bold text-black">Go to workouts</Link>
    </div>
  );
}
