import type { Metadata } from "next";
import { MediaPageClient } from "@/components/media/MediaPageClient";

export const metadata: Metadata = {
  title: "Press & Media Room — Vayuvega",
  description: "Twenty years of scattered evidence on Vayuvega — news clippings, leaked footage, official statements, and photographs no one can quite explain.",
};

export default function MediaPage() {
  return <MediaPageClient />;
}
