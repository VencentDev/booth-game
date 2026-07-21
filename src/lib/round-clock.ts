export const ROUND_SECONDS = 60;

export function createRoundStartedAt(): number | null {
  return null;
}

export function startRoundAt(now: number): number {
  return now;
}

export function getSecondsRemaining(startedAt: number | null, now: number): number {
  if (startedAt === null) {
    return ROUND_SECONDS;
  }

  const elapsedSeconds = Math.floor((now - startedAt) / 1000);
  return Math.max(0, ROUND_SECONDS - elapsedSeconds);
}
