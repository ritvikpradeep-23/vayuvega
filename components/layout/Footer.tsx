import Link from "next/link";
import { WindSpiralIcon } from "@/components/ui/WindSpiralIcon";

export function Footer() {
  return (
    <footer className="border-t border-card-border/60 bg-void-deep px-6 py-12 text-center">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <WindSpiralIcon className="h-8 w-8" />
          <span className="font-display text-base font-bold tracking-wide text-kasavu">VAYUVEGA</span>
        </Link>
        <div className="flex gap-6 text-xs font-semibold tracking-widest text-mist">
          <span>WEB</span>
          <span>CONTACT</span>
          <span>PRIVACY</span>
        </div>
        <p className="text-xs text-mist/70">© 2026 Vayuvega Help Portal · Kerala, India · All incidents handled</p>
      </div>
    </footer>
  );
}
