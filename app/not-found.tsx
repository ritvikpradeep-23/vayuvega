import Link from "next/link";
import { WindSpiralIcon } from "@/components/ui/WindSpiralIcon";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <WindSpiralIcon className="h-14 w-14 opacity-70" />
      <p className="mt-6 text-xs font-bold tracking-[0.25em] text-kasavu">SIGNAL LOST</p>
      <h1 className="mt-4 font-display text-4xl font-extrabold text-cream sm:text-5xl">
        The Wind Didn&apos;t <span className="text-kasavu">Find This One</span>
      </h1>
      <p className="mx-auto mt-4 max-w-md text-mist">
        Whatever you were looking for isn&apos;t here — moved, renamed, or never mapped. Even Vayuvega loses the
        trail sometimes.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gradient-to-r from-kasavu to-kasavu-soft px-6 py-2.5 text-xs font-bold tracking-widest text-void"
      >
        BACK TO SAFE GROUND
      </Link>
    </div>
  );
}
