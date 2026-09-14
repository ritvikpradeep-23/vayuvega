import type { CostumeEra } from "./costumeData";

export interface PersonHelped {
  id: string;
  name: string;
  situation: string;
  outcome: string;
  quote: string;
  costumeEra: CostumeEra;
}

export const peopleHelpedData: PersonHelped[] = [
  {
    id: "p1",
    name: "Meera K.",
    situation: "Fisherman's wife, Kozhikode — her husband's boat capsized in a night squall.",
    outcome: "Guided safely to shore before the coast guard arrived.",
    quote: "I didn't see him. I just felt the wind push us home.",
    costumeEra: "windbreaker",
  },
  {
    id: "p2",
    name: "Thomas Varghese",
    situation: "Tea estate supervisor, Nilgiris — trapped under debris in the 2016 landslide.",
    outcome: "Pulled free with 27 co-workers in under 90 seconds.",
    quote: "We heard rain. There wasn't any rain that night.",
    costumeEra: "waymark",
  },
  {
    id: "p3",
    name: "Anitha Nair",
    situation: "Mother, Ernakulam — stranded with her infant daughter in a flooded ground-floor flat during the 2019 floods.",
    outcome: "Carried to a relief boat within minutes.",
    quote: "He didn't say a word. He just made sure we were dry before he was gone.",
    costumeEra: "eye-form",
  },
  {
    id: "p4",
    name: "Sudhakaran P.",
    situation: "Fisherman, Lakshadweep — boat capsized 40 km offshore during Cyclone Biparjoy.",
    outcome: "Reached shore along with all 13 other crews before the coast guard was deployed.",
    quote: "The sea was trying to keep us. Something stronger disagreed.",
    costumeEra: "storm-skin",
  },
  {
    id: "p5",
    name: "Devika S.",
    situation: "College student, Wayanad — cut off in a landslide-isolated village, grandmother needing medicine.",
    outcome: "Supply caches appeared overnight for all six cut-off villages.",
    quote: "We never asked. It just showed up, like the monsoon does.",
    costumeEra: "waymark",
  },
];
