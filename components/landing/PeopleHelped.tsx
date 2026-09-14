"use client";

import { motion } from "framer-motion";
import { peopleHelpedData } from "@/lib/peopleHelpedData";
import { CostumeBadge } from "@/components/costumes/CostumeBadge";
import { HUDPanel } from "@/components/ui/HUDPanel";

export function PeopleHelped() {
  return (
    <section id="helped" className="bg-void-deep px-6 py-24 scroll-mt-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold tracking-[0.25em] text-kasavu">TESTIMONIALS</p>
        <h2 className="mt-4 font-display text-4xl font-extrabold text-cream sm:text-5xl">
          People He&apos;s <span className="text-kasavu">Helped</span>
        </h2>
        <p className="mt-4 text-mist">
          He doesn&apos;t stay for thanks. These are the ones who remember anyway.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {peopleHelpedData.map((person, i) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
          >
            <HUDPanel className="flex h-full flex-col">
              <div className="flex justify-center rounded-xl bg-void py-4">
                <CostumeBadge era={person.costumeEra} id={`helped-${person.id}`} className="h-16 w-16" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-cream">{person.name}</h3>
              <p className="mt-2 text-sm text-mist">{person.situation}</p>
              <p className="mt-2 text-sm font-semibold text-kasavu">{person.outcome}</p>
              <p className="mt-4 flex-1 text-sm italic text-mist">&ldquo;{person.quote}&rdquo;</p>
            </HUDPanel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
