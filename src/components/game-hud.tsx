import { formatElapsed, formatSeconds } from "@/lib/format";

type GameHudProps = {
  timeRemaining: number;
  moves: number;
  matches: number;
  totalPairs: number;
  bestSolveMs: number | null;
};

export function GameHud({
  timeRemaining,
  moves,
  matches,
  totalPairs,
  bestSolveMs
}: GameHudProps) {
  return (
    <section className="game-hud" aria-label="Game stats">
      <div className="hud-item hud-time">
        <span className="hud-icon" aria-hidden="true">
          <ClockIcon />
        </span>
        <span className="hud-label">Time</span>
        <strong>{formatSeconds(timeRemaining)}</strong>
        <span
          className="timer-bar"
          style={{ "--timer-progress": timeRemaining / 60 } as React.CSSProperties}
        />
      </div>

      <div className="hud-item">
        <span className="hud-icon green" aria-hidden="true">
          <MovesIcon />
        </span>
        <span className="hud-label">Moves</span>
        <strong>{moves}</strong>
      </div>

      <div className="hud-item">
        <span className="hud-icon violet" aria-hidden="true">
          <StarIcon />
        </span>
        <span className="hud-label">Matches</span>
        <strong>
          {matches} / {totalPairs}
        </strong>
      </div>

      <div className="hud-item">
        <span className="hud-icon gold" aria-hidden="true">
          <TrophyIcon />
        </span>
        <span className="hud-label">Best</span>
        <strong>{formatElapsed(bestSolveMs)}</strong>
      </div>
    </section>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function MovesIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img">
      <path d="M4 8h13" />
      <path d="m13 4 4 4-4 4" />
      <path d="M20 16H7" />
      <path d="m11 12-4 4 4 4" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img">
      <path d="m12 4 2.3 4.7 5.2.8-3.8 3.7.9 5.2-4.6-2.4-4.6 2.4.9-5.2-3.8-3.7 5.2-.8L12 4Z" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img">
      <path d="M8 5h8v4a4 4 0 0 1-8 0V5Z" />
      <path d="M8 7H5a3 3 0 0 0 3 3" />
      <path d="M16 7h3a3 3 0 0 1-3 3" />
      <path d="M12 13v4" />
      <path d="M8 19h8" />
    </svg>
  );
}
