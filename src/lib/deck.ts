export type Card = {
  id: string;
  pairId: string;
  title: string;
  imageUrl: string;
  accent: string;
};

type PairDefinition = {
  pairId: string;
  title: string;
  imageUrl: string;
  accent: string;
};

export const PAIRS: PairDefinition[] = [
  {
    pairId: "qhealth",
    title: "Qhealth",
    imageUrl: "/products/1.jpeg",
    accent: "#32d56d"
  },
  {
    pairId: "qlearn",
    title: "Qlearn",
    imageUrl: "/products/2.jpeg",
    accent: "#d45f22"
  },
  {
    pairId: "qlegal",
    title: "Qlegal",
    imageUrl: "/products/3.jpeg",
    accent: "#6b128f"
  },
  {
    pairId: "qlinic",
    title: "Qlinic",
    imageUrl: "/products/4.jpeg",
    accent: "#35a696"
  },
  {
    pairId: "qhris",
    title: "Qhris",
    imageUrl: "/products/5.jpeg",
    accent: "#5db18c"
  },
  {
    pairId: "proqure",
    title: "Proqure",
    imageUrl: "/products/6.jpeg",
    accent: "#1067a8"
  },
  {
    pairId: "qerp",
    title: "Qerp",
    imageUrl: "/products/7.jpeg",
    accent: "#2f3192"
  },
  {
    pairId: "qlims",
    title: "Qlims",
    imageUrl: "/products/8.jpeg",
    accent: "#2d6fb5"
  },
  {
    pairId: "qinventory",
    title: "Qinventory",
    imageUrl: "/products/9.jpeg",
    accent: "#2f9ba8"
  },
  {
    pairId: "qerp-alt",
    title: "QERP",
    imageUrl: "/products/10.jpeg",
    accent: "#2f3192"
  }
];

export function shuffleCards<T>(
  items: readonly T[],
  random: () => number = Math.random
): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index]
    ];
  }

  return shuffled;
}

export function createDeck(random: () => number = Math.random): Card[] {
  const cards = PAIRS.flatMap((pair) => [
    {
      ...pair,
      id: `${pair.pairId}-a`
    },
    {
      ...pair,
      id: `${pair.pairId}-b`
    }
  ]);

  return shuffleCards(cards, random);
}
