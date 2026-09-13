import { Hero } from "@/components/landing/Hero";
import { OriginStory } from "@/components/landing/OriginStory";
import { Powers } from "@/components/landing/Powers";
import { Mission } from "@/components/landing/Mission";
import { Personality } from "@/components/landing/Personality";
import { CaseTimeline } from "@/components/timeline/CaseTimeline";
import { CostumeSlider } from "@/components/costumes/CostumeSlider";
import { SightingsBoard } from "@/components/sightings/SightingsBoard";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <OriginStory />
      <Powers />
      <Mission />
      <Personality />
      <CaseTimeline />
      <CostumeSlider />
      <SightingsBoard />
      <footer className="border-t border-kasavu/10 px-6 py-8 text-center text-xs text-zinc-500">
        Vayuvega — an original superhero. Built for the TechAscent machine test.
      </footer>
    </div>
  );
}
