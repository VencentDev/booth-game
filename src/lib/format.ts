export function formatSeconds(seconds: number): string {
  const clampedSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(clampedSeconds / 60);
  const remainingSeconds = clampedSeconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function formatElapsed(ms: number | null): string {
  if (ms === null) {
    return "--";
  }

  return `${(ms / 1000).toFixed(1)}s`;
}
