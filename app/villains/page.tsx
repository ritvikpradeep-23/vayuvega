import type { Metadata } from "next";
import { villainsData } from "@/lib/villainsData";
import { VillainCard } from "@/components/villains/VillainCard";

export const metadata: Metadata = {
  title: "Villains Defeated — Vayuvega",
  description: "The case file: rogues Vayuvega has faced across twenty years in Kerala.",
};

export default function VillainsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold tracking-[0.25em] text-red-500/80">CASE FILE · CLASSIFIED</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-zinc-100 sm:text-5xl">Villains Defeated</h1>
        <p className="mt-4 max-w-xl text-zinc-500">
          Not every story ends clean. A record of the rogues Vayuvega has faced — some closed cases, some still
          open.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {villainsData.map((villain, i) => (
            <VillainCard key={villain.id} villain={villain} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
