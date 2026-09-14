import { Hero } from "@/components/landing/Hero";
import { OriginStory } from "@/components/landing/OriginStory";
import { Mission } from "@/components/landing/Mission";
import { CaseTimeline } from "@/components/timeline/CaseTimeline";
import { CostumeSlider } from "@/components/costumes/CostumeSlider";
import { SightingsBoard } from "@/components/sightings/SightingsBoard";
import { PeopleHelped } from "@/components/landing/PeopleHelped";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <OriginStory />
      <Mission />
      <CaseTimeline />
      <CostumeSlider />
      <SightingsBoard />
      <PeopleHelped />
    </div>
  );
}
