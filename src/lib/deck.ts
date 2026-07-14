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
    pairId: "mountain",
    title: "Mountain",
    imageUrl: "",
    accent: "#f6c453"
  },
  {
    pairId: "camera",
    title: "Camera",
    imageUrl: "",
    accent: "#8fd3ff"
  },
  {
    pairId: "leaf",
    title: "Leaf",
    imageUrl: "",
    accent: "#9ee37d"
  },
  {
    pairId: "bicycle",
    title: "Bicycle",
    imageUrl: "",
    accent: "#f58f7c"
  },
  {
    pairId: "coffee",
    title: "Coffee",
    imageUrl: "",
    accent: "#d9b88f"
  },
  {
    pairId: "anchor",
    title: "Anchor",
    imageUrl: "",
    accent: "#7cc7ff"
  },
  {
    pairId: "music",
    title: "Music",
    imageUrl: "",
    accent: "#c4a1ff"
  },
  {
    pairId: "compass",
    title: "Compass",
    imageUrl: "",
    accent: "#ffcf70"
  },
  {
    pairId: "book",
    title: "Book",
    imageUrl: "",
    accent: "#92e3d4"
  },
  {
    pairId: "spark",
    title: "Spark",
    imageUrl: "",
    accent: "#ff9eb3"
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
