import type { Card } from "@/lib/deck";

type MemoryCardProps = {
  card: Card;
  isRevealed: boolean;
  isSelected: boolean;
  isMatched: boolean;
  disabled: boolean;
  onClick: () => void;
};

export function MemoryCard({
  card,
  isRevealed,
  isSelected,
  isMatched,
  disabled,
  onClick
}: MemoryCardProps) {
  const label = isRevealed ? `${card.title} card` : "Hidden card";

  return (
    <button
      aria-label={label}
      aria-pressed={isRevealed}
      className={[
        "memory-card",
        isRevealed ? "is-revealed" : "",
        isSelected ? "is-selected" : "",
        isMatched ? "is-matched" : ""
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled || isMatched}
      onClick={onClick}
      style={{ "--card-accent": card.accent } as React.CSSProperties}
      type="button"
    >
      <span className="card-inner">
        <span className="card-face card-back" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="back-logo" src="/icons/qb-logo.png" alt="" />
        </span>
        <span className="card-face card-front">
          <span className="image-slot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={card.imageUrl} />
          </span>
        </span>
      </span>
    </button>
  );
}
