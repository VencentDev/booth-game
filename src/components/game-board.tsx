import type { Card } from "@/lib/deck";
import { MemoryCard } from "./memory-card";

type GameBoardProps = {
  cards: Card[];
  selectedIds: string[];
  revealedIds: Set<string>;
  matchedIds: Set<string>;
  disabled: boolean;
  onCardClick: (id: string) => void;
};

export function GameBoard({
  cards,
  selectedIds,
  revealedIds,
  matchedIds,
  disabled,
  onCardClick
}: GameBoardProps) {
  return (
    <section className="game-board" aria-label="Matching card board">
      {cards.map((card) => (
        <MemoryCard
          key={card.id}
          card={card}
          disabled={disabled}
          isMatched={matchedIds.has(card.id)}
          isRevealed={revealedIds.has(card.id)}
          isSelected={selectedIds.includes(card.id)}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </section>
  );
}
