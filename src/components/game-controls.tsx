type GameControlsProps = {
  onRestart: () => void;
  onGiveUp: () => void;
  giveUpDisabled: boolean;
};

export function GameControls({
  onRestart,
  onGiveUp,
  giveUpDisabled
}: GameControlsProps) {
  return (
    <div className="game-controls">
      <button className="control-button" type="button" onClick={onRestart}>
        <RestartIcon />
        Restart
      </button>
      <button
        className="control-button danger"
        type="button"
        onClick={onGiveUp}
        disabled={giveUpDisabled}
      >
        <GiveUpIcon />
        Give up
      </button>
    </div>
  );
}

function RestartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 12a8 8 0 1 1-2.3-5.7" />
      <path d="M20 4v6h-6" />
    </svg>
  );
}

function GiveUpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}
